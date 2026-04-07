import { Directive, computed, input } from '@angular/core';

@Directive({
  selector: '[appEnable]',
  host: {
    '[class.operate-text]': 'enable()',
    '[class.operate-text-disabled]': 'disabledStyle()'
  }
})
export class DisabledDirective {
  readonly appEnable = input<boolean>(false);

  readonly enable = computed(() => this.appEnable());
  readonly disabledStyle = computed(() => !this.appEnable());
}
