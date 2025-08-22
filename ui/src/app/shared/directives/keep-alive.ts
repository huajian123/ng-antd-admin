import { Directive, effect, inject, input, TemplateRef, ViewContainerRef, ViewRef } from '@angular/core';

@Directive({
  selector: '[appKeepAlive]'
})
export class KeepAlive {
  readonly appKeepAlive = input.required<boolean>();

  constructor() {
    const templateRef = inject(TemplateRef);
    const viewContainerRef = inject(ViewContainerRef);

    let viewRef: ViewRef;

    effect(() => {
      if (this.appKeepAlive()) {
        viewRef ??= templateRef.createEmbeddedView(viewContainerRef);
        viewContainerRef.insert(viewRef);
      } else {
        viewContainerRef.detach();
      }
    });
  }
}
