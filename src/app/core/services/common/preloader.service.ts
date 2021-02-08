import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {

  constructor(@Inject(DOCUMENT) private doc: Document) {
  }

  removePreLoader(): void {
    const preloader = this.doc.querySelector('.preloader');
    if (!preloader) {
      return;
    }
    preloader.addEventListener('transitionend', () => {
      preloader.className = 'dis-no';
    });
  }
}
