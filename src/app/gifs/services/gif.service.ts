import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';
import { Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private SEARCH_HISTORY_KEY = 'searchHistory';
  private http = inject(HttpClient);

  // Empleamos Records para almacenar un diccionario con el historial de búsqueda
  searchHistory = signal<Record<string, Gif[]>>({});
  // Se vuelve a computar cada vez que se modifique el historial
  searchHistoryKeys = computed<string[]>(() =>
    Object.keys(this.searchHistory())
  );

  saveSearchHistoryToLocalStorage = effect(() =>
    localStorage.setItem(
      this.SEARCH_HISTORY_KEY,
      JSON.stringify(this.searchHistory())
    )
  );

  private getSearchHistoryFromLocalStorage = (): Record<string, Gif[]> => {
    const jsonSearchHistory = localStorage.getItem(this.SEARCH_HISTORY_KEY);
    return jsonSearchHistory ? JSON.parse(jsonSearchHistory) : {};
  };

  constructor() {
    this.searchHistory.set(this.getSearchHistoryFromLocalStorage());
    console.log('GifService creado');
  }

  searchTrendingGifs(): Observable<Gif[]> {
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

  searchGifs(query: string): Observable<Gif[]> {
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
            // Operador spread para Records
            this.searchHistory.update((history) => ({
              ...history,
              [query.toLowerCase()]: items,
            }))
          )
        )
    );
  }

  searchHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
