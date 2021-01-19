import { InputBoolean, InputNumber, isEmpty, toBoolean, toNumber } from './check';

describe('util.#isEmpty', () => {
  it('should empty when only spaces', () => {
    const mockEl: any = {
      childNodes: {
        length: 1,
        item: () => {
          return {
            nodeType: 3,
            textContent: ' ',
          };
        },
      },
    };
    expect(isEmpty(mockEl)).toBe(true);
  });
  it('should not empty when has text', () => {
    const mockEl: any = {
      childNodes: {
        length: 1,
        item: () => {
          return {
            nodeType: 3,
            textContent: '1 ',
          };
        },
      },
    };
    expect(isEmpty(mockEl)).toBe(false);
  });
});

describe('util.#toBoolean', () => {
  [
    { value: undefined, ret: undefined, au: true },
    { value: undefined, ret: false },
    { value: null, ret: false },
    { value: '', ret: true },
    { value: 0, ret: true },
    { value: 'false', ret: false },
    { value: false, ret: false },
    { value: true, ret: true },
    { value: 'true', ret: true },
    { value: 'pink', ret: true },
    { value: {}, ret: true },
    { value: [], ret: true },
  ].forEach(item => {
    const au = typeof item.au !== 'undefined';
    it(`should coerce [${JSON.stringify(item.value)}] to [${JSON.stringify(item.ret)}]${au ? ', because allow undefined' : ''}`, () => {
      if (au) {
        expect(toBoolean(item.value, item.au)).toBe(item.ret);
      } else {
        expect(toBoolean(item.value)).toBe(item.ret);
      }
    });
  });
});

describe('util.#InputBoolean', () => {
  it('should be working', () => {
    class MockClass {
      private _val = true;
      @InputBoolean() set val(val: any) {
        this._val = val;
      }
      get val(): any {
        return this._val;
      }
    }
    const cls = new MockClass();
    expect(cls.val).toBe(true);
    cls.val = 'false';
    expect(cls.val).toBe(false);
  });
  it('should be warn when already exist', () => {
    spyOn(console, 'warn');
    const target = {};
    InputBoolean()(target, 'a');
    InputBoolean()(target, 'a');
    expect(console.warn).toHaveBeenCalled();
  });
});

describe('util.toNumber', () => {
  it('should coerce undefined to 0 or default', () => {
    expect(toNumber(undefined)).toBe(0);
    expect(toNumber(undefined, 111)).toBe(111);
  });

  it('should coerce null to 0 or default', () => {
    expect(toNumber(null)).toBe(0);
    expect(toNumber(null, 111)).toBe(111);
  });

  it('should coerce true to 0 or default', () => {
    expect(toNumber(true)).toBe(0);
    expect(toNumber(true, 111)).toBe(111);
  });

  it('should coerce false to 0 or default', () => {
    expect(toNumber(false)).toBe(0);
    expect(toNumber(false, 111)).toBe(111);
  });

  it('should coerce the empty string to 0 or default', () => {
    expect(toNumber('')).toBe(0);
    expect(toNumber('', 111)).toBe(111);
  });

  it('should coerce the string "1" to 1', () => {
    expect(toNumber('1')).toBe(1);
    expect(toNumber('1', 111)).toBe(1);
  });

  it('should coerce the string "123.456" to 123.456', () => {
    expect(toNumber('123.456')).toBe(123.456);
    expect(toNumber('123.456', 111)).toBe(123.456);
  });

  it('should coerce the string "-123.456" to -123.456', () => {
    expect(toNumber('-123.456')).toBe(-123.456);
    expect(toNumber('-123.456', 111)).toBe(-123.456);
  });

  it('should coerce an arbitrary string to 0 or default', () => {
    expect(toNumber('pink')).toBe(0);
    expect(toNumber('pink', 111)).toBe(111);
  });

  it('should coerce an arbitrary string prefixed with a number to 0 or default', () => {
    expect(toNumber('123pink')).toBe(0);
    expect(toNumber('123pink', 111)).toBe(111);
  });

  it('should coerce the number 1 to 1', () => {
    expect(toNumber(1)).toBe(1);
    expect(toNumber(1, 111)).toBe(1);
  });

  it('should coerce the number 123.456 to 123.456', () => {
    expect(toNumber(123.456)).toBe(123.456);
    expect(toNumber(123.456, 111)).toBe(123.456);
  });

  it('should coerce the number -123.456 to -123.456', () => {
    expect(toNumber(-123.456)).toBe(-123.456);
    expect(toNumber(-123.456, 111)).toBe(-123.456);
  });

  it('should coerce an object to 0 or default', () => {
    expect(toNumber({})).toBe(0);
    expect(toNumber({}, 111)).toBe(111);
  });

  it('should coerce an array to 0 or default', () => {
    expect(toNumber([])).toBe(0);
    expect(toNumber([], 111)).toBe(111);
  });
});

describe('util.#InputNumber', () => {
  it('should be warn when already exist', () => {
    spyOn(console, 'warn');
    class MockClass {
      private _val = true;
      @InputNumber()
      @InputNumber()
      set val(val: any) {
        this._val = val;
      }
      get val(): any {
        return this._val;
      }
    }
    // tslint:disable-next-line: no-unused-expression
    new MockClass();
    expect(console.warn).toHaveBeenCalled();
  });
});
