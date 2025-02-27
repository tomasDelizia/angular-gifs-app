import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GifService } from '../../services/gif.service';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  imports: [GifListComponent],
  templateUrl: './gif-history-page.component.html',
})
export default class GifHistoryPageComponent {
  gifService = inject(GifService);
  // Usamos el método toSignal para convertir un obaservable en una señal
  // ActivatedRoute.params nos permite obtener los parámetros actuales de la url, según lo definido en app.routes.ts
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map((params) => params['query'] ?? 'No encontrado')
    )
  );

  gifsByKey = computed(() => this.gifService.searchHistoryGifs(this.query()));
}
