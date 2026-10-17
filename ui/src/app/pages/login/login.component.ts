import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Lang, LanguageService } from '@core/services/store/common-store/language.service';
import { TranslatePipe } from '@ngx-translate/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTypographyComponent } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',

  imports: [NzIconModule, NzButtonModule, NzDropdownModule, NzMenuModule, TranslatePipe, RouterOutlet, NzTypographyComponent]
})
export class LoginComponent {
  private languageService = inject(LanguageService);

  $currentLang = computed(() => this.languageService.$currentLang());

  changeLang(lang: Lang): void {
    this.languageService.setLang(lang);
  }
}
