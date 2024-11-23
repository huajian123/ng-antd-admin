import {
  ComponentRef,
  Directive,
  Input,
  ChangeDetectorRef,
  EmbeddedViewRef,
  OnChanges,
  SimpleChanges,
  Type,
  ViewContainerRef,
  TemplateRef,
  KeyValueDiffer,
  KeyValueDiffers,
  inject
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
  selector: '[viewOutlet]',
  standalone: true
})
export class ViewOutletDirective implements OnChanges {
  private componentRef: ComponentRef<NzSafeAny> | undefined;

  private embeddedViewRef: EmbeddedViewRef<NzSafeAny> | undefined;

  /**
   * 组件或者模板 TemplateRef
   */
  @Input() viewOutlet: Type<NzSafeAny> | TemplateRef<NzSafeAny> | null = null;

  /**
   * 组件和模板上下文传递数据
   */
  @Input() viewOutletContext?: NzSafeAny;

  private keyValueDiffer!: KeyValueDiffer<NzSafeAny, NzSafeAny>;
  private viewContainerRef = inject(ViewContainerRef);
  private keyValueDiffers = inject(KeyValueDiffers);

  ngOnChanges(changes: SimpleChanges): void {
    const { viewContainerRef: viewContainerRef } = this;
    if (changes['viewOutlet']) {
      viewContainerRef.clear();
      this.componentRef = undefined;
      this.embeddedViewRef = undefined;

      if (this.viewOutlet) {
        if (this.viewOutlet instanceof TemplateRef) {
          this.embeddedViewRef = viewContainerRef.createEmbeddedView(this.viewOutlet, this.viewOutletContext);
        } else {
          this.componentRef = viewContainerRef.createComponent(this.viewOutlet, {
            index: viewContainerRef.length
          });
        }
      }
    }

    if (changes['viewOutletContext']) {
      let updatedKeys: string[] = [];
      if (changes['viewOutletContext'].isFirstChange()) {
        this.keyValueDiffer = this.keyValueDiffers.find(this.viewOutletContext).create();
        this.keyValueDiffer.diff(this.viewOutletContext);
        updatedKeys = Object.keys(this.viewOutletContext);
      } else {
        const changes = this.keyValueDiffer.diff(this.viewOutletContext);
        changes!.forEachChangedItem(item => {
          updatedKeys.push(item.key);
        });
      }
      if (this.componentRef) {
        this.updateContext(this.componentRef.instance, updatedKeys);
        this.componentRef.injector.get(ChangeDetectorRef).markForCheck();
      } else if (this.embeddedViewRef) {
        this.updateContext(this.embeddedViewRef.context, updatedKeys);
        this.embeddedViewRef.markForCheck();
      }
    }
  }

  private updateContext(context: NzSafeAny, updatedKeys: string[]): void {
    updatedKeys.forEach(key => {
      context[key] = this.viewOutletContext[key];
    });
  }
}
