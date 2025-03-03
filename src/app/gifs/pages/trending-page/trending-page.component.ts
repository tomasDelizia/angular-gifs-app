import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
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
  private trendingGifsPage = signal(-1);
  trendingGifsGroup = computed<Gif[][]>(() => {
    // Creamos una matriz de tres 3 columnas
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    return groups;
  });

  // Señal que hace referencia al elemento HTML Div
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  constructor() {
    this.searchTrendingGifs();
  }

  searchTrendingGifs() {
    if (this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);
    this.trendingGifsPage.update((previous) => previous + 1);
    this.gifService
      .searchTrendingGifs(this.trendingGifsPage())
      .subscribe((response) => {
        this.trendingGifs.update((previous) => [...previous, ...response]);
        this.trendingGifsLoading.set(false);
      });
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    // La cantidad de pixeles que se mueve el usuario desde arriba de la pantalla
    const scrollTop = scrollDiv.scrollTop;
    // Tamaño del viewport/viewpoint
    const clientHeight = scrollDiv.clientHeight;
    // Tamaño de todo el contenido, excede el viewport
    const scrollHeight = scrollDiv.scrollHeight;
    // Scroll total
    const scrollTotal = scrollTop + clientHeight;
    // Disparar una nueva búsqueda cuando el total del scroll supere el 76% del tamaño total del contenido
    const isNearBottom = scrollTotal / scrollHeight >= 0.76;
    if (isNearBottom) {
      this.searchTrendingGifs();
    }
  }
}
