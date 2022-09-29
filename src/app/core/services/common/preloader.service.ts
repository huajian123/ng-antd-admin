import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

/*
 * 顶部滚动pre服务
 * */
@Injectable({
  providedIn: 'root'
})
export class PreloaderService {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  removePreLoader(): void {
    const el = this.doc.getElementById('globalLoader');
    if (el) {
      el.addEventListener('transitionend', () => {
        el.className = 'global-loader-hidden';
      });

      if (!el.classList.contains('global-loader-hidden')) {
        el.className += ' global-loader-fade-in';
      }
    }
  }
}
