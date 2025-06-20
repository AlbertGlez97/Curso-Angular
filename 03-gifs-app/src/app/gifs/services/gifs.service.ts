import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

function loadFromLocalStorage(): Record<string, Gif[]> {
  const searchHistory = localStorage.getItem('searchHistory');

  if (searchHistory) {
    try {
      const parsed = JSON.parse(searchHistory) as Record<string, Gif[]>;

      // Verificar que el objeto parseado tiene la estructura correcta
      if (typeof parsed === 'object' && parsed !== null) {
        // Verificar que todas las propiedades son arrays de Gif
        const isValidRecord = Object.entries(parsed).every(([key, value]) => {
          return (
            typeof key === 'string' &&
            Array.isArray(value) &&
            value.every((item) => typeof item === 'object' && item !== null)
          );
        });

        if (isValidRecord) {
          return parsed;
        }
      }

      // Si el parseo falla o la estructura no es válida, retornar objeto vacío
      return {};
    } catch (error) {
      console.error('Error parsing search history from localStorage:', error);
      return {};
    }
  }

  return {};
}

/**
 * Servicio responsable de gestionar los datos de GIFs y la interacción con la API de Giphy.
 *
 * @remarks
 * Este servicio se proporciona en el inyector raíz, por lo que es un singleton en toda la aplicación.
 * Carga los GIFs de tendencia desde la API de Giphy al inicializarse y expone señales para
 * los GIFs de tendencia y su estado de carga.
 */
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  /**
   * Instancia de HttpClient de Angular, inyectada para realizar peticiones HTTP.
   */
  private http = inject(HttpClient);

  /**
   * Señal que contiene el arreglo actual de GIFs de tendencia.
   * Se actualiza cuando se cargan nuevos GIFs de tendencia desde la API.
   */
  trendingGifs = signal<Gif[]>([]);

  /**
   * Señal computada que agrupa los GIFs de tendencia en grupos de 3 elementos.
   *
   * Esta señal toma el arreglo de GIFs de tendencia y los divide en subarreglos
   * de máximo 3 elementos cada uno. Esto es útil para crear layouts de malla
   * o disposiciones en columnas donde se necesitan grupos específicos de elementos.
   *
   * @returns Un arreglo de arreglos de GIFs, donde cada subarreglo contiene máximo 3 GIFs
   */
  trendigGifGroup = computed<Gif[][]>(() => {
    const groups = [];

    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    return groups;
  });

  /**
   * Historial de búsquedas almacenado como un objeto donde:
   * - La clave (key) es el término de búsqueda (string)
   * - El valor es un arreglo de GIFs encontrados para esa búsqueda (Gif[])
   *
   * Record<string, Gif[]> es un tipo de TypeScript que define un objeto con:
   * - Propiedades de tipo string (las claves)
   * - Valores de tipo Gif[] (los arreglos de GIFs)
   */
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());

  saveToLocalStorage = effect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()));
  });

  /**
   * Señal computada que extrae las claves (términos de búsqueda) del historial.
   * Retorna un arreglo de strings con todos los términos de búsqueda utilizados.
   */
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  /**
   * Señal que indica si los GIFs de tendencia se están cargando actualmente.
   * Se establece en `true` mientras se cargan y en `false` cuando termina la carga.
   */
  trendingGifsLoading = signal<boolean>(false);

  private treadingPage = signal<number>(0);

  /**
   * Inicializa el servicio y dispara la carga de los GIFs de tendencia.
   * Muestra un mensaje en la consola cuando el servicio se inicializa.
   */
  constructor() {
    this.loadTrendingGifs();
  }

  /**
   * Carga los GIFs de tendencia desde la API de Giphy.
   *
   * @remarks
   * Realiza una petición HTTP GET al endpoint de tendencias de Giphy, usando la clave de API y un límite de 20 resultados.
   * Mapea la respuesta a un arreglo de objetos `Gif` y actualiza la señal `trendingGifs`.
   * Cambia la señal `trendingGifsLoading` a `false` cuando termina la carga.
   * Muestra los GIFs cargados en la consola.
   */
  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: this.treadingPage() * 20,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.update((prev) => [...prev, ...gifs]);
        this.trendingGifsLoading.set(false);
        this.treadingPage.update((page) => page + 1);
      });
  }

  /**
   * Realiza una búsqueda de GIFs utilizando la API de Giphy.
   *
   * @param query - La cadena de búsqueda que se utilizará para consultar GIFs.
   * @returns Un observable que emite un arreglo de objetos `Gif` mapeados desde la respuesta de Giphy.
   *
   * El método realiza una petición HTTP GET al endpoint de búsqueda de Giphy, pasando como parámetros la clave de API,
   * el término de búsqueda y el límite de resultados. Utiliza el operador `pipe` para transformar la respuesta:
   * - El primer operador `map` extrae la propiedad `data` de la respuesta de Giphy.
   * - El segundo operador `map` transforma el arreglo de elementos de Giphy en un arreglo de objetos `Gif` utilizando el método `GifMapper.mapGiphyItemsToGifArray`.
   * - El operador `tap` nos permite realizar efectos secundarios sin modificar el flujo de datos.
   *   Es útil para debugging o realizar operaciones que no afectan al flujo principal.
   *   En este caso, actualizamos el historial de búsqueda con los resultados obtenidos.
   */
  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          q: query,
          limit: 20,
        },
      })
      .pipe(
        // El operador map nos permite transformar los datos que fluyen a través del observable
        // En este caso, extraemos solo la propiedad 'data' de la respuesta de Giphy
        map(({ data }) => data),

        // Otro map para transformar los items de Giphy en nuestro modelo de Gif
        // utilizando el mapper que hemos definido
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

        // El operador tap nos permite realizar efectos secundarios sin modificar el flujo de datos
        // Es útil para debugging o realizar operaciones que no afectan al flujo principal
        // En este caso, actualizamos el historial de búsqueda con los resultados
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );
  }

  /**
   * Obtiene los GIFs del historial de búsqueda para una consulta específica.
   *
   * @param query - La cadena de búsqueda para la cual se desean obtener los GIFs del historial.
   * @returns Un arreglo de objetos `Gif` que fueron previamente buscados para esta consulta.
   *          Si no existe historial para la consulta, retorna un arreglo vacío.
   *
   * Este método accede al historial de búsqueda almacenado en el servicio y busca
   * los resultados asociados a la consulta proporcionada. Utiliza el operador de
   * coalescencia nula (??) para manejar el caso donde no existe historial para
   * la consulta, retornando un arreglo vacío en lugar de undefined.
   */
  getHistoryGifs(query: string): Gif[] {
    // Accede al historial de búsqueda y busca los GIFs asociados a la consulta
    // Si no existe historial para esta consulta, retorna un arreglo vacío
    return this.searchHistory()[query] ?? [];
  }
}
