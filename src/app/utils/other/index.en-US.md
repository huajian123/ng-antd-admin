---
title: other
subtitle: Other
type: Type
---

## isEmpty

Used to verify `<ng-content></ng-content>` is empty, useful for custom components.

## toBoolean

Convert to `boolean`.

## toNumber

Convert to `number`.

## deepGet

Gets the value at `path` of `object`, like `_.get` in lodash.

```ts
const obj = {
  id: 1,
  user: {
    name: 'cipchk',
    age: 18
  }
};

deepGet(obj, 'id'); // 1
deepGet(obj, 'user.age'); // 18
```

## deepCopy

Base on [extend](https://github.com/justmoon/node-extend) deep copy.

```ts
const source = { a: 1, user: { name: 'cipchk' } };
const obj = deepCopy(source);
```

## deepMerge

Deep merge object.

```ts
let original = { a: 1, b: { c: 'c' } };
deepMerge(original, { b: { d: 'd' }, arr: [ 1 ] });
// output: { a: 1, b: { c: 'c', d: 'd' }, arr: [ 1 ] }
```

## copy

Copy text to clipboard.

## updateHostClass

Update host component style `class`, for example:

```ts
updateHostClass(
  this.el.nativeElement,
  this.renderer,
  {
    [ 'classname' ]: true,
    [ 'classname' ]: this.type === '1',
    [ this.cls ]: true,
    [ `a-${this.cls}` ]: true
  }
)
```
