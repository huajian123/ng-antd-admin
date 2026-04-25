import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomPageTitleResolverService extends TitleStrategy {
  readonly title = inject(Title);
  private translate = inject(TranslateService);
  private destroyRef = inject(DestroyRef);
  private lastRouterState: RouterStateSnapshot | null = null;

  constructor() {
    super();
    this.translate.onLangChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      if (this.lastRouterState) {
        this.updateTitle(this.lastRouterState);
      }
    });
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    this.lastRouterState = routerState;
    const titleKey = this.buildTitle(routerState);
    if (titleKey !== undefined) {
      const title = this.translate.instant(titleKey) || titleKey;
      this.title.setTitle(`${title} - Ant Design`);
    }
  }
}
