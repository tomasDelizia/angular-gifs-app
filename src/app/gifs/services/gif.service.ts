import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';
import { Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http = inject(HttpClient);

  // Empleamos Records para almacenar un diccionario con el historial de búsqueda
  searchHistory = signal<Record<string, Gif[]>>({});
  // Se vuelve a computar cada vez que se modifique el historial
  searchHistoryKeys = computed<string[]>(() =>
    Object.keys(this.searchHistory())
  );

  constructor() {
    console.log('GifService creado');
  }

  searchTrendingGifs() {
    console.log('Searching trending gifs');
    return this.http
      .get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items))
      );
  }

  searchGifs(query: string) {
    console.log('Searching gifs with query:', query);
    return (
      this.http
        .get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`, {
          params: {
            q: query,
            api_key: environment.giphyApiKey,
            limit: 20,
          },
        })
        // .pipe(map(({ data }) => GifMapper.mapGiphyItemsToGifArray(data))); // Haciendolo en una línea queda así
        .pipe(
          map(({ data }) => data),
          map((items) => GifMapper.mapGiphyItemsToGifArray(items)),
          // El operador tap es útil para el manejo de efectos secundarios. A diferencia de map, no modifica los datos
          // Historial de búsquedas
          tap((items) =>
            this.searchHistory.update((history) => ({
              ...history,
              [query.toLowerCase()]: items,
            }))
          )
        )
    );
  }
}
