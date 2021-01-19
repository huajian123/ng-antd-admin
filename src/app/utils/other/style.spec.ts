import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { updateHostClass } from './style';

describe('util: style', () => {
  let page: PageObject;
  beforeEach(() => (page = new PageObject()));

  it('should be add classes', () => {
    const varCls = 'var';
    page
      .run({
        a: true,
        ['aa']: true,
        [varCls]: true,
      })
      .has('a')
      .has('aa')
      .has(varCls);
  });

  it('should be removed when add new classes', () => {
    page.run({ a: true, b: false }).has('a', true).has('b', false).run({ a: false, b: true }).has('a', false).has('b', true);
  });

  it('should be clearn all when add new classes', () => {
    page.run({ a: true }).has('a', true).has('b', false).run({ b: true }, true).has('a', false).has('b', true);
  });

  class PageObject {
    fakeEl: any = {};
    fakeRender: any = {
      removeClass: (_el: NzSafeAny, value: NzSafeAny) => delete this.fakeEl[value],
      addClass: (_el: NzSafeAny, value: NzSafeAny) => (this.fakeEl[value] = ''),
      removeAttribute: () => (this.fakeEl = {}),
    };

    run(obj: {}, cleanAll?: boolean): this {
      if (typeof cleanAll === 'undefined') {
        updateHostClass(this.fakeEl, this.fakeRender, obj);
      } else {
        updateHostClass(this.fakeEl, this.fakeRender, obj, cleanAll);
      }
      return this;
    }

    has(clsName: string, result: boolean = true): this {
      expect(this.fakeEl.hasOwnProperty(clsName)).toBe(result);
      return this;
    }
  }
});
