import { Directive, effect, input, numberAttribute, output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Directive({
  selector: '[appDebounceClick]',
  host: {
    '(click)': 'clickEvent($event)'
  }
})
export class DebounceClickDirective {
  readonly debounceTime = input(500, { transform: numberAttribute });
  readonly debounceClick = output<NzSafeAny>();

  private clicks = new Subject<NzSafeAny>();

  constructor() {
    effect((onCleanup) => {
      const sub = this.clicks.pipe(debounceTime(this.debounceTime())).subscribe(e => this.debounceClick.emit(e));
      onCleanup(() => sub.unsubscribe());
    });
  }

  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
