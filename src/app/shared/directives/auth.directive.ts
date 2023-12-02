import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { UserInfoService } from '@store/common-store/userInfo.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  codeArray!: string[];

  private userInfoService = inject(UserInfoService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  @Input('appAuth')
  set appAuth(authCode: string | undefined) {
    if (!authCode) {
      this.show(true);
      return;
    }
    this.codeArray.includes(authCode) ? this.show(true) : this.show(false);
  }

  constructor() {
    this.userInfoService.getUserInfo().subscribe(userInfo => {
      this.codeArray = userInfo.authCode;
    });
  }

  private show(hasAuth: boolean): void {
    hasAuth ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear();
  }
}
