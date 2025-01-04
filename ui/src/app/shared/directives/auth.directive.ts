import { Directive, inject, input, Input, InputSignal, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { UserInfoStoreService } from '@store/common-store/userInfo-store.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective implements OnInit {
  codeArray!: string[];

  private userInfoService = inject(UserInfoStoreService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);

  appAuth = input.required<string>();

  constructor() {
    this.userInfoService.getUserInfo().subscribe(userInfo => {
      this.codeArray = userInfo.authCode;
    });
  }

  ngOnInit(): void {
    if (!this.appAuth()) {
      this.show(true);
      return;
    }
    this.codeArray.includes(this.appAuth()) ? this.show(true) : this.show(false);
  }

  private show(hasAuth: boolean): void {
    hasAuth ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear();
  }
}
