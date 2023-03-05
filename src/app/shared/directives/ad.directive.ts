import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAd]',
  standalone: true
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
