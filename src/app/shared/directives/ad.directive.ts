import { Directive, inject, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAd]',
  standalone: true
})
export class AdDirective {
  viewContainerRef = inject(ViewContainerRef);
}
