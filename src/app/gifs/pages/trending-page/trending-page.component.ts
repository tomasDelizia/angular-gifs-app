import { Component, inject, signal } from '@angular/core';
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

  constructor() {
    this.gifService
      .searchTrendingGifs()
      .subscribe((response) => this.trendingGifs.set(response));
  }
}
