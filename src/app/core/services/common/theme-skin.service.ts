import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { first } from 'rxjs/operators';

import { StyleTheme, ThemeService } from '@store/common-store/theme.service';

/*
 * 切换主题服务
 * */
@Injectable({
  providedIn: 'root'
})
export class ThemeSkinService {
  currentTheme: StyleTheme = 'default';
  private readonly doc = inject(DOCUMENT);
  private readonly themesService = inject(ThemeService);
  destroyRef = inject(DestroyRef);

  reverseTheme(theme: StyleTheme): StyleTheme {
    return theme;
  }

  removeUnusedTheme(theme: StyleTheme): void {
    this.doc.documentElement.classList.remove(theme);
    const removedThemeStyle = this.doc.getElementById(theme);
    if (removedThemeStyle) {
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
    if (isFirstLoad) {
      this.themesService
        .getStyleThemeMode()
        .pipe(first(), takeUntilDestroyed(this.destroyRef))
        .subscribe(currentStyleTheme => {
          let trueKey: StyleTheme = 'default';
          for (let key in currentStyleTheme) {
            if (currentStyleTheme[key as StyleTheme] == true) {
              trueKey = key as StyleTheme;
              break;
            }
          }
          console.log(trueKey);
          this.currentTheme = trueKey;
        });
    }
    const theme = this.currentTheme;
    if (isFirstLoad) {
      console.log(theme);
      console.log(3333);
      this.doc.documentElement.classList.add(theme);
    }
    return new Promise<Event>((resolve, reject) => {
      this.loadCss(`${theme}.css`, theme).then(
        e => {
          if (!isFirstLoad) {
            this.doc.documentElement.classList.add(theme);
          }
          this.removeUnusedTheme(this.reverseTheme(theme));
          resolve(e);
        },
        e => reject(e)
      );
    });
  }

  public toggleTheme(): Promise<Event> {
    this.currentTheme = this.reverseTheme(this.currentTheme);
    return this.loadTheme(false);
  }
}
