---
title: string
subtitle: 字符串
type: Type
---

## format

字符串格式化。

```ts
format('this is ${name}', { name: 'asdf' })
// output: this is asdf
format('this is ${user.name}', { user: { name: 'asdf' } }, true)
// output: this is asdf
```

**参数**

- `str: string` 模板
- `obj: {}` 数据对象
- `needDeepGet = false` 是否需要深度获取，支持 `${user.address.city}` 写法。
