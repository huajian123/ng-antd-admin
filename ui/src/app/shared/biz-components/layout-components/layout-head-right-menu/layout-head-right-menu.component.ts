import { NgTemplateOutlet } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { Router } from '@angular/router';

import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { WindowService } from '@core/services/common/window.service';
import { AccountService, UserPsd } from '@services/system/account.service';
import { ScreenLessHiddenDirective } from '@shared/directives/screen-less-hidden.directive';
import { ToggleFullscreenDirective } from '@shared/directives/toggle-fullscreen.directive';
import { Lang, LanguageService } from '@store/common-store/language.service';
import { UserInfoStoreService } from '@store/common-store/userInfo-store.service';
import { ModalBtnStatus } from '@widget/base-modal';
import { ChangePasswordService } from '@widget/biz-widget/change-password/change-password.service';
import { LockWidgetService } from '@widget/common-widget/lock-widget/lock-widget.service';
import { SearchRouteService } from '@widget/common-widget/search-route/search-route.service';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalOptions } from 'ng-zorro-antd/modal';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { HomeNoticeComponent } from '../home-notice/home-notice.component';

@Component({
  selector: 'app-layout-head-right-menu',
  templateUrl: './layout-head-right-menu.component.html',
  styleUrl: './layout-head-right-menu.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet, NzTooltipModule, NzIconModule, NzButtonModule, ToggleFullscreenDirective, NzDropdownModule, NzBadgeModule, NzMenuModule, HomeNoticeComponent, ScreenLessHiddenDirective, TranslateModule]
})
export class LayoutHeadRightMenuComponent {
  user!: UserPsd;

  private router = inject(Router);
  private changePasswordModalService = inject(ChangePasswordService);
  private loginOutService = inject(LoginInOutService);
  private lockWidgetService = inject(LockWidgetService);
  private windowServe = inject(WindowService);
  private searchRouteService = inject(SearchRouteService);
  private message = inject(NzMessageService);
  private userInfoService = inject(UserInfoStoreService);
  private accountService = inject(AccountService);
  private languageService = inject(LanguageService);
  private translate = inject(TranslateService);

  userInfo = computed(() => this.userInfoService.$userInfo());
  $currentLang = computed(() => this.languageService.$currentLang());

  changeLang(lang: Lang): void {
    this.languageService.setLang(lang);
  }

  // 锁定屏幕
  lockScreen(): void {
    this.lockWidgetService
      .show({
        nzTitle: this.translate.instant('common.lockScreen'),
        nzStyle: { top: '25px' },
        nzWidth: '520px',
        nzFooter: null,
        nzMaskClosable: true
      })
      .subscribe();
  }

  // 修改密码
  changePassWorld(): void {
    this.changePasswordModalService.show({ nzTitle: this.translate.instant('common.changePassword') }).subscribe(({ modalValue, status }) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      this.user = {
        id: this.userInfo().userId,
        oldPassword: modalValue.oldPassword,
        newPassword: modalValue.newPassword
      };
      this.accountService.editAccountPsd(this.user).subscribe(() => {
        this.loginOutService.loginOut().then();
        this.message.success(this.translate.instant('common.changePwdSuccess'));
      });
    });
  }

  showSearchModal(): void {
    const modalOptions: ModalOptions = {
      nzClosable: false,
      nzMaskClosable: true,
      nzStyle: { top: '48px' },
      nzFooter: null,
      nzBodyStyle: { padding: '0' }
    };
    this.searchRouteService.show(modalOptions);
  }

  goLogin(): void {
    this.loginOutService.loginOut().then();
  }

  clean(): void {
    this.windowServe.clearStorage();
    this.windowServe.clearSessionStorage();
    this.loginOutService.loginOut().then();
    this.message.success(this.translate.instant('common.clearCacheSuccess'));
  }

  goPage(path: string): void {
    this.router.navigateByUrl(`/default/page-demo/personal/${path}`);
  }
}
