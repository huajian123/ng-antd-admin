import { Directive, Input, OnInit, TemplateRef } from '@angular/core';

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
  selector: 'ng-template[named]',
  standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NamedTemplate<T> implements OnInit {
  /**
   * 模板名称
   */
  @Input({ required: true }) named!: string;
  constructor(public template: TemplateRef<T>) {}

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
