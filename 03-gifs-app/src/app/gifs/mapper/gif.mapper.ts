// Importa la interfaz Gif que define la estructura de un objeto Gif
import { Gif } from "../interfaces/gif.interface";
// Importa la interfaz GiphyItem que representa un elemento recibido de la API de Giphy
import { GiphyItem } from "../interfaces/giphy.interfaces";

// Define una clase utilitaria para mapear objetos de Giphy a objetos Gif internos
export class GifMapper {
    // Método estático que convierte un solo objeto GiphyItem en un objeto Gif
    static mapGiphyItemToGif(item: GiphyItem): Gif {
        return {
            // Asigna el id del GiphyItem al id del Gif
            id: item.id,
            // Asigna el título del GiphyItem al título del Gif
            title: item.title,
            // Extrae la URL de la imagen original del GiphyItem y la asigna al Gif
            url: item.images.original.url,
        };
    }

    // Método estático que convierte un array de GiphyItem en un array de Gif
    static mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {
        // Utiliza el método anterior para mapear cada elemento del array
        return items.map(this.mapGiphyItemToGif);
    }
};