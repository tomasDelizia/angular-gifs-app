import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GifListItemComponent {}
