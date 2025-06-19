// Importaciones necesarias para el componente
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';
import { GifListComponent } from "../../components/gif-list/gif-list.component";

/**
 * Componente que muestra el historial de GIFs para una búsqueda específica.
 * 
 * Este componente se activa cuando el usuario navega a una ruta como '/dashboard/history/:query'
 * y muestra los GIFs que fueron previamente buscados para ese término de búsqueda.
 */
@Component({
  selector: 'gif-history',
  imports: [GifListComponent],
  templateUrl: './gif-history.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimización: solo detecta cambios cuando las referencias cambian
})
export default class GifHistoryComponent { 

  // Inyección del servicio de GIFs para acceder al historial de búsquedas
  gifsService = inject(GifsService);

  /**
   * Señal que contiene el parámetro 'query' de la URL.
   * 
   * Utiliza toSignal para convertir el observable de parámetros de ruta en una señal.
   * El operador map extrae específicamente el parámetro 'query' de los parámetros de la ruta.
   * Esta señal se actualiza automáticamente cuando cambia la URL.
   */
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map((params) => params['query'])
    )
  )

  /**
   * Señal computada que obtiene los GIFs del historial para la consulta actual.
   * 
   * Esta señal se recalcula automáticamente cuando cambia el valor de 'query'.
   * Utiliza el método getHistoryGifs del servicio para obtener los GIFs previamente
   * buscados para el término de búsqueda especificado en la URL.
   */
  gifsByKey = computed(() => this.gifsService.getHistoryGifs(this.query()));

}
