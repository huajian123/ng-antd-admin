import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAd]'
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
