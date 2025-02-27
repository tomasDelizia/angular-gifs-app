import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  constructor() {
    console.log('GifService creado');
  }

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
        },
      })
      .subscribe((response) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
        this.trendingGifs.set(gifs);
        this.trendingGifsLoading.set(false);
        console.log({ gifs });
      });
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
