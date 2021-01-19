---
title: string
subtitle: String
type: Type
---

## format

String formatting.

```ts
format('this is ${name}', { name: 'asdf' })
// output: this is asdf
format('this is ${user.name}', { user: { name: 'asdf' } }, true)
// output: this is asdf
```

**Parameters**

- `str: string` Template
- `obj: {}` Data Object
- `needDeepGet = false` Whether deep get item, like this: `${user.address.city}`.
