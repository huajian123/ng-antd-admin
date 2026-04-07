import { computed, Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';

import { UserInfoStoreService } from '@store/common-store/userInfo-store.service';

@Directive({
  selector: '[appAuth]',
})
export class AuthDirective {
  readonly appAuth = input.required<string>();

  private readonly userInfoService = inject(UserInfoStoreService);
  private readonly templateRef = inject(TemplateRef);
  private readonly viewContainerRef = inject(ViewContainerRef);

  private readonly hasAuth = computed(() => {
    const code = this.appAuth();
    if (!code) return true;
    return this.userInfoService.$userInfo().authCode.includes(code);
  });

  constructor() {
    effect(() => {
      this.hasAuth() ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear();
    });
  }
}
