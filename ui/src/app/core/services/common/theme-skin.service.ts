import { DOCUMENT } from '@angular/common';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private currentStyleThemeModel!: StyleTheme; // 已经在构造函数中初始化了,当前主题风格的模式，阿里云、默认、紧凑、暗黑
  destroyRef = inject(DestroyRef);

  constructor() {
    this.themesService
      .getStyleThemeMode()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(currentStyleTheme => {
        this.currentStyleThemeModel = currentStyleTheme;
      });
  }

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
    const theme = this.currentStyleThemeModel;
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
            .filter(item => item !== this.currentStyleThemeModel)
            .forEach(item => {
              setTimeout(() => {
                this.removeUnusedTheme(<StyleTheme>item);
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
