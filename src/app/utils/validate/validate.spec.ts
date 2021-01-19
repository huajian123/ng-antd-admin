import { FormControl } from '@angular/forms';
import { isDecimal, isIdCard, isInt, isMobile, isNum, isUrl } from './validate';
import { _Validators } from './validators';

describe('utils: validate', () => {
  it('#isNum', () => {
    const data = [
      { k: '123', v: true },
      { k: '12.3', v: true },
      { k: '12.', v: false },
      { k: '-12', v: true },
      { k: 123, v: true },
      { k: '123.1.2', v: false },
      { k: '123a', v: false },
    ];
    for (const item of data) {
      expect(isNum(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.num(ctr)).toBeNull();
      } else {
        expect(_Validators.num(ctr)).toEqual({ num: true });
      }
    }
  });

  it('#isInt', () => {
    const data = [
      { k: '123', v: true },
      { k: 123, v: true },
      { k: '123.1', v: false },
      { k: '123.123', v: false },
    ];
    for (const item of data) {
      expect(isInt(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.int(ctr)).toBeNull();
      } else {
        expect(_Validators.int(ctr)).toEqual({ int: true });
      }
    }
  });

  it('#isDecimal', () => {
    const data = [
      { k: '12.3', v: true },
      { k: '-12.3', v: true },
      { k: '123', v: false },
      { k: '12.', v: false },
      { k: '-12', v: false },
      { k: 123, v: false },
      { k: '123.1.2', v: false },
      { k: '123a', v: false },
    ];
    for (const item of data) {
      expect(isDecimal(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);
      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.decimal(ctr)).toBeNull();
      } else {
        expect(_Validators.decimal(ctr)).toEqual({ decimal: true });
      }
    }
  });

  it('#isIdCard', () => {
    const data = [
      { k: '610102198006042614', v: true },
      { k: '61010219800604261', v: false },
    ];
    for (const item of data) {
      expect(isIdCard(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.idCard(ctr)).toBeNull();
      } else {
        expect(_Validators.idCard(ctr)).toEqual({ idCard: true });
      }
    }
  });

  it('#isMobile', () => {
    const data = [
      { k: '15900000000', v: true },
      { k: '17000000000', v: true },
      { k: '14700000000', v: true },
      { k: '1590000000', v: false },
      { k: '+8615900000000', v: true },
    ];
    for (const item of data) {
      expect(isMobile(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.mobile(ctr)).toBeNull();
      } else {
        expect(_Validators.mobile(ctr)).toEqual({ mobile: true });
      }
    }
  });

  it('#isUrl', () => {
    const data = [
      { k: 'http://ng-alain.com', v: true },
      { k: 'https://ng-alain.com', v: true },
      { k: '//ng-alain.com', v: false },
      { k: 'ng-alain.com', v: false },
      { k: '中国.com', v: false },
    ];
    for (const item of data) {
      expect(isUrl(item.k)).toBe(item.v, `${item.k}=${typeof item.k} must be ${item.v}`);

      const ctr = new FormControl(item.k);
      if (item.v) {
        expect(_Validators.url(ctr)).toBeNull();
      } else {
        expect(_Validators.url(ctr)).toEqual({ url: true });
      }
    }
  });
});
