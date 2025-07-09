import { computed, inject, Injectable, DOCUMENT } from '@angular/core';

import { StyleTheme, ThemeService } from '@store/common-store/theme.service';

/*
 * 切换主题服务
 * */
@Injectable({
  providedIn: 'root'
})
export class ThemeSkinService {
  private readonly doc = inject(DOCUMENT);
  private readonly themesService = inject(ThemeService);
  private $currentStyleTheme = computed(() => this.themesService.$themeStyle());

  removeUnusedTheme(theme: StyleTheme): void {
    const removedThemeStyle = this.doc.getElementById(theme);
    if (removedThemeStyle) {
      this.doc.documentElement.classList.remove(theme);
      this.doc.head.removeChild(removedThemeStyle);
    }
  }

  private loadCss(href: string, id: string): Promise<Event> {
    return new Promise((resolve, reject) => {
      const style = this.doc.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      style.id = id;
      style.onload = resolve;
      style.onerror = reject;
      this.doc.head.append(style);
    });
  }

  public loadTheme(isFirstLoad = true): Promise<Event> {
    const theme = this.$currentStyleTheme();
    if (isFirstLoad) {
      this.doc.documentElement.classList.add(theme);
    }
    return new Promise<Event>((resolve, reject) => {
      this.loadCss(`${theme}.css`, theme).then(
        e => {
          if (!isFirstLoad) {
            this.doc.documentElement.classList.add(theme);
          }
          (['default', 'aliyun', 'compact', 'dark'] as StyleTheme[])
            .filter(item => item !== this.$currentStyleTheme())
            .forEach(item => {
              setTimeout(() => {
                this.removeUnusedTheme(item as StyleTheme);
              }, 1);
            });

          resolve(e);
        },
        e => reject(e)
      );
    });
  }

  public toggleTheme(): Promise<Event> {
    return this.loadTheme(false);
  }
}
