import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { GifService } from '../../services/gif.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state-service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  // Señal que hace referencia al elemento HTML Div
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  // Se ejecuta tan pronto la vista es inicializada o reconstruida
  ngAfterViewInit(): void {
    // Restauramos la posición del scroll
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
    console.log(
      'Valor del scroll guardado es ',
      this.scrollStateService.trendingScrollState()
    );
    console.log('Restauramos el scroll top a ', scrollDiv.scrollTop);
  }

  onScroll(event: Event) {
    // debugger // Esta palabra reservada abre el debug console del navegador
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
    // Guardamos el valor de la posición actual del scroll
    this.scrollStateService.trendingScrollState.set(scrollTop);
    if (isNearBottom) {
      this.gifService.searchTrendingGifs();
    }
  }
}
