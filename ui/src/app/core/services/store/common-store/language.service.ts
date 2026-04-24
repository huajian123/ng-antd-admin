import { Injectable, inject, signal } from '@angular/core';

import { LangKey } from '@config/constant';
import { WindowService } from '@core/services/common/window.service';

import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, zh_CN, zh_TW, en_US, vi_VN } from 'ng-zorro-antd/i18n';

export type Lang = 'zh_CN' | 'zh_TW' | 'en_US' | 'vi_VN';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private translate = inject(TranslateService);
  private nzI18n = inject(NzI18nService);
  private windowServe = inject(WindowService);

  $currentLang = signal<Lang>('zh_CN');

  setLang(lang: Lang): void {
    const nzLocaleMap = { zh_CN, zh_TW, en_US, vi_VN };
    this.translate.use(lang);
    this.nzI18n.setLocale(nzLocaleMap[lang]);
    this.$currentLang.set(lang);
    this.windowServe.setStorage(LangKey, lang);
  }
}
