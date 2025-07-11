import { Directive, Input, OnInit, TemplateRef, inject } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * 获取模板名称
 *
 * @example
 * ``` html
 * <ng-template named="test"></ng-template>
 * <ng-template #test named></ng-template>
 *
 * ```
 * ``` javascript
 * @Component(...)
 * export class TestComponent {
 *   @ViewChildren(NamedTemplate) list!: QueryList<NamedTemplate>;
 *
 *   trace() {
 *     this.list.forEach(it => {
 *       console.log(it.named);
 *       console.log(it.template);
 *     });
 *   }
 * }
 * ```
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template[named]',
  standalone: true
})
export class NamedTemplate<T> implements OnInit {
  template = inject<TemplateRef<T>>(TemplateRef);

  /**
   * 模板名称
   */
  @Input({ required: true }) named!: string;

  ngOnInit(): void {
    this.resolveName();
  }

  resolveName(): void {
    if (!this.named && this.template) {
      const tplRef = this.template as NzSafeAny;
      // localNames为数组, 如果没有name则为null
      this.named = tplRef._declarationTContainer.localNames?.[0];
    }
  }
}
