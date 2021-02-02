import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../../core/services/store/auth.service';

@Directive({
  selector: '[appAuth]'
})
export class AuthDirective {
  codeArray!: string[];

  @Input('appAuth')
  set appAuth(authCode: string | undefined) {
    if (!authCode) {
      this.show(true);
      return;
    }
    this.codeArray.includes(authCode) ? this.show(true) : this.show(false);
  }

  constructor(private authService: AuthService, private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef) {
    this.authService.getAuthCode().subscribe((codeArray) => {
      this.codeArray = codeArray;
    });
  }

  private show(hasAuth: boolean): void {
    hasAuth ? this.viewContainerRef.createEmbeddedView(this.templateRef) : this.viewContainerRef.clear();
  }

}
