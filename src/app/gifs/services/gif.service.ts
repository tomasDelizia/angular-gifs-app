import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { GifMapper } from '../mapper/gif.mapper';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http = inject(HttpClient);

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
          map((items) => GifMapper.mapGiphyItemsToGifArray(items))
        )
    );
    // TODO Historial
  }
}
