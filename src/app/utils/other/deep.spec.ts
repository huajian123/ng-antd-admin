import { deepCopy, deepGet, deepMerge, deepMergeKey } from './deep';

describe('abc: utils', () => {
  describe('#deepGet', () => {
    const tree = {
      responsne: {
        list: [],
        total: 10,
      },
      status: 'ok',
    };
    it('should be get [status]', () => {
      expect(deepGet(tree, ['status'])).toBe(tree.status);
    });
    it('should be get [responsne.totle]', () => {
      expect(deepGet(tree, ['responsne', 'total'])).toBe(tree.responsne.total);
    });
    it('should be return default value when not exist key', () => {
      const def = 'aa';
      expect(deepGet(tree, ['status11'], def)).toBe(def);
    });
    it('should be return default value when not exist deep key', () => {
      const def = 'aa';
      expect(deepGet(tree, ['responsne', 'totala'], def)).toBe(def);
    });
    it('should be return default value when path is null', () => {
      const def = 'aa';
      expect(deepGet(tree, null, def)).toBe(def);
    });
    it('should be return default value when path is empty array', () => {
      const def = 'aa';
      expect(deepGet(tree, [], def)).toBe(def);
    });
    it('should be return default value when source object is null', () => {
      const def = 'aa';
      expect(deepGet(null, ['status11'], def)).toBe(def);
    });
    it('should be dot get', () => {
      expect(deepGet(tree, 'responsne.total')).toBe(tree.responsne.total);
    });
    it('should be string path', () => {
      expect(deepGet(tree, 'status')).toBe(tree.status);
    });
    it('should be return default value when paths include null value', () => {
      expect(deepGet({ res: {} }, 'res.address.city')).toBeUndefined();
    });
    it('should be get zero value', () => {
      const res = deepGet({ res: { zero: 0 } }, 'res.zero');
      expect(res).toBe(0);
    });
  });

  it('#deepCopy', () => {
    const a = { number: 1 };
    expect(deepCopy(a).number).toBe(a.number);
  });

  describe('#deepMerge', () => {
    let original: any;
    it('should working', () => {
      const fn = () => {};
      const time = new Date();
      original = { a: 1, b: { c: 'c' }, fn, arr2: [], str: 'str', time, bool: true };

      deepMerge(original, { b: { d: 'd' }, arr: [2] });

      expect(original.b.c).toBe('c');
      expect(original.b.d).toBe('d');
      expect(original.fn).toBe(fn);
      expect(original.arr.length).toBe(1);
      expect(original.arr2.length).toBe(0);
      expect(original.str).toBe('str');
      expect(original.time).toBe(time);
      expect(original.bool).toBe(true);
    });
    it('should be only object of original', () => {
      original = [];

      deepMerge(original, [1, 2], [3, 4]);

      expect(Array.isArray(original)).toBe(true);
      expect(original.length).toBe(0);
    });
    it('should support dynamic params', () => {
      original = { a: 1, b: 2 };

      deepMerge(original, { c: 3 }, { d: 4 });

      expect(original.a).toBe(1);
      expect(original.b).toBe(2);
      expect(original.c).toBe(3);
      expect(original.d).toBe(4);
    });
    it('should be null or undefined', () => {
      original = { a: null };

      deepMerge(original, { a: null, b: undefined });

      expect(original.a).toBe(null);
      expect(original.b).toBe(undefined);
      expect(original.c).toBe(undefined);
    });
    it('should be ingored null or undefined in objects arguments', () => {
      original = {};

      deepMerge(original, null, undefined);

      expect(Object.keys(original).length).toBe(0);
    });
  });

  describe('#deepMergeKey', () => {
    it('should be merge array', () => {
      const original = { arr: [1, 2] };
      deepMergeKey(original, false, { arr: [3] });
      expect(original.arr.length).toBe(3);
    });

    it('should be override array ', () => {
      const original = { arr: [1, 2] };
      deepMergeKey(original, true, { arr: [3] });
      expect(original.arr.length).toBe(1);
      expect(original.arr[0]).toBe(3);
    });
  });
});
