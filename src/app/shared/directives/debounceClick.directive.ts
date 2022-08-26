import { Directive, EventEmitter, HostListener, Input, OnInit, OnDestroy, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Directive({
  selector: '[appDebounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 500;
  @Output() readonly debounceClick = new EventEmitter();
  private clicks = new Subject<NzSafeAny>();
  private subscription!: Subscription;

  constructor() {}

  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }

  ngOnInit(): void {
    this.subscription = this.clicks.pipe(debounceTime(this.debounceTime)).subscribe(e => this.debounceClick.emit(e));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
