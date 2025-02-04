import { DestroyRef, inject, Injectable } from '@angular/core';

import { StyleThemeModelKey, ThemeOptionsKey } from '@config/constant';
import { StyleTheme, ThemeService } from '@store/common-store/theme.service';

import { WindowService } from './window.service';
/*
 * 初始化theme
 * */
@Injectable({
  providedIn: 'root'
})
export class InitThemeService {
  private themesService = inject(ThemeService);
  private windowServe = inject(WindowService);
  destroyRef = inject(DestroyRef);

  initTheme(): Promise<void> {
    return new Promise(resolve => {
      let themeStyleCash = this.windowServe.getStorage(StyleThemeModelKey);
      if (themeStyleCash) {
        this.themesService.$themeStyle.set(<StyleTheme>themeStyleCash);
      }

      let themeOptionsCash = this.windowServe.getStorage(ThemeOptionsKey);
      if (themeOptionsCash) {
        this.themesService.$themesOptions.set(JSON.parse(themeOptionsCash));
      }
      return resolve();
    });
  }
}
