import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAd]',
})
export class AdDirective {
  viewContainerRef = inject(ViewContainerRef);
}
