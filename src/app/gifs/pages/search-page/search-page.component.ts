import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  imports: [GifListComponent],
})
export default class SearchPageComponent {
  gifService = inject(GifService);

  gifsByQuery = signal<Gif[]>([]);
  gifsByQueryLoading = signal(false);

  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe((response) => {
      this.gifsByQuery.set(response);
    });
  }
}
