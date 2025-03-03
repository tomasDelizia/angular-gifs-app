import { Component, computed, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  imports: [GifListComponent],
})
export default class TrendingPageComponent {
  gifService = inject(GifService);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);
  trendingGifsGroup = computed<Gif[][]>(() => {
    // Creamos una matriz de tres 3 columnas
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    console.log({ groups });
    return groups;
  });

  constructor() {
    this.gifService
      .searchTrendingGifs()
      .subscribe((response) => this.trendingGifs.set(response));
  }
}
