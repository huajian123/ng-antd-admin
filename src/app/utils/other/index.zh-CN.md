---
title: other
subtitle: 其他
type: Type
---

## isEmpty

用于校验 `<ng-content></ng-content>` 是否为空，自定义组件时蛮有用。

## toBoolean

转换 `boolean` 属性

## toNumber

转换 `number` 属性

## deepGet

类似 `_.get`，根据 `path` 获取安全值。

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

基于 [extend](https://github.com/justmoon/node-extend) 的深度拷贝。

```ts
const source = { a: 1, user: { name: 'cipchk' } };
const obj = deepCopy(source);
```

## deepMerge

深度合并。

```ts
let original = { a: 1, b: { c: 'c' } };
deepMerge(original, { b: { d: 'd' }, arr: [ 1 ] });
// output: { a: 1, b: { c: 'c', d: 'd' }, arr: [ 1 ] }
```

## copy

复制字符串文档至剪贴板。

## updateHostClass

更新宿主组件样式 `class`，例如：

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
