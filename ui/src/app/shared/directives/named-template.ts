import { Directive, TemplateRef, inject, input, signal, effect } from '@angular/core';

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
 *       console.log(it.named());
 *       console.log(it.template);
 *     });
 *   }
 * }
 * ```
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-template[named]',
})
export class NamedTemplate<T> {
  template = inject<TemplateRef<T>>(TemplateRef);

  /**
   * 模板名称
   */
  readonly namedInput = input<string>('', { alias: 'named' });

  /**
   * 解析后的模板名称（fallback 到模板变量名）
   */
  readonly named = signal<string>('');

  constructor() {
    effect(() => {
      const name = this.namedInput();
      if (name) {
        this.named.set(name);
      } else {
        const tplRef = this.template as NzSafeAny;
        // localNames为数组, 如果没有name则为null
        this.named.set(tplRef._declarationTContainer.localNames?.[0] ?? '');
      }
    });
  }
}
