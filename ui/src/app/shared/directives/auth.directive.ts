import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { UserInfoStoreService } from '@store/common-store/userInfo-store.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  codeArray!: string[];

  private userInfoService = inject(UserInfoStoreService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input()
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
