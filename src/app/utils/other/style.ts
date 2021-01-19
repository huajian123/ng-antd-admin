import { Renderer2 } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

function removeClass(el: HTMLElement, classMap: object, renderer: Renderer2): void {
  // tslint:disable-next-line: forin
  for (const i in classMap) {
    renderer.removeClass(el, i);
  }
}

function addClass(el: HTMLElement, classMap: NzSafeAny, renderer: Renderer2): void {
  for (const i in classMap) {
    if (classMap[i]) {
      renderer.addClass(el, i);
    }
  }
}

/**
 * 更新宿主组件样式 `class`，例如：
 *
 * ```ts
 * updateHostClass(
 *  this.el.nativeElement,
 *  this.renderer,
 *  {
 *    [ 'classname' ]: true,
 *    [ 'classname' ]: this.type === '1',
 *    [ this.cls ]: true,
 *    [ `a-${this.cls}` ]: true
 *  })
 * ```
 *
 * @param [cleanAll] 是否先清理所有 `class` 值，默认：`false`
 */
export function updateHostClass(el: HTMLElement, renderer: Renderer2, classMap: object, cleanAll: boolean = false): void {
  if (cleanAll === true) {
    renderer.removeAttribute(el, 'class');
  } else {
    removeClass(el, classMap, renderer);
  }
  classMap = { ...classMap };
  addClass(el, classMap, renderer);
}
