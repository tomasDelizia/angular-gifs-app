import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from '../interfaces/giphy.interfaces';

export class GifMapper {
  static mapGiphyItemToGif(giphyItem: GiphyItem): Gif {
    return {
      id: giphyItem.id,
      title: giphyItem.title,
      url: giphyItem.url,
    };
  }

  static mapGiphyItemsToGifArray(giphyItems: GiphyItem[]): Gif[] {
    return giphyItems.map(this.mapGiphyItemToGif);
  }
}
