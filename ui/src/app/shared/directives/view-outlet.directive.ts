import {
  ComponentRef,
  Directive,
  Type,
  ViewContainerRef,
  TemplateRef,
  inject,
  input,
  effect,
  ChangeDetectorRef
} from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

/*<ng-container *viewOutlet="counterComponent; context: { count: count, from: 'Component' }"></ng-container>

<ng-container *viewOutlet="counter; context: { count: count, from: 'Template' }"></ng-container>

  <ng-template #counter let-count="count" let-from="from">
  <p>{{ count }}</p>
<p>{{ from }}</p>
</ng-template>*/

/**
 * 视图 Outlet 组件，取代 NgComponentOutlet 和 NgTemplateOutlet
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[viewOutlet]',
})
export class ViewOutletDirective {
  private componentRef: ComponentRef<NzSafeAny> | undefined;

  /**
   * 组件或者模板 TemplateRef
   */
  readonly viewOutlet = input<Type<NzSafeAny> | TemplateRef<NzSafeAny> | null>(null);

  /**
   * 组件和模板上下文传递数据
   */
  readonly viewOutletContext = input<NzSafeAny>();

  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const outlet = this.viewOutlet();
      const context = this.viewOutletContext();
      const { viewContainerRef } = this;

      viewContainerRef.clear();
      this.componentRef = undefined;

      if (!outlet) return;

      if (outlet instanceof TemplateRef) {
        viewContainerRef.createEmbeddedView(outlet, context);
      } else {
        this.componentRef = viewContainerRef.createComponent(outlet, {
          index: viewContainerRef.length
        });
        if (context) {
          this.updateContext(this.componentRef.instance, context);
          this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
        }
      }
    });
  }

  private updateContext(instance: NzSafeAny, context: NzSafeAny): void {
    Object.keys(context).forEach(key => {
      instance[key] = context[key];
    });
  }
}
