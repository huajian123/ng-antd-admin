import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appEnable]',
  standalone: true
})
export class DisabledDirective {
  @Input('appEnable')
  set appDisabled(value: boolean) {
    this.enable = value;
    this.disabledStyle = !value;
  }

  @HostBinding('class.operate-text') enable = false;
  @HostBinding('class.operate-text-disabled') disabledStyle = false;
}
