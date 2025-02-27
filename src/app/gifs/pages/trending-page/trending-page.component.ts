import { Component } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  imports: [GifListComponent],
})
export default class TrendingPageComponent {}
