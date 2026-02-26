import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appEnable]',
  standalone: true,
  host: {
    '[class.operate-text]': 'enable',
    '[class.operate-text-disabled]': 'disabledStyle'
  }
})
export class DisabledDirective {
  @Input('appEnable')
  set appDisabled(value: boolean) {
    this.enable = value;
    this.disabledStyle = !value;
  }

  enable = false;
  disabledStyle = false;
}
