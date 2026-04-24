import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CustomPageTitleResolverService extends TitleStrategy {
  readonly title = inject(Title);
  private translate = inject(TranslateService);

  constructor() {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot): void {
    const titleKey = this.buildTitle(routerState);
    if (titleKey !== undefined) {
      const title = this.translate.instant(titleKey) || titleKey;
      this.title.setTitle(`${title} - Ant Design`);
    }
  }
}
