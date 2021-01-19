---
title: 校验
type: Type
---

## API

| 方法名      | 说明         |
|-------------|------------|
| `isNum`     | 是否为数字   |
| `isInt`     | 是否为整数   |
| `isDecimal` | 是否为小数   |
| `isIdCard`  | 是否为身份证 |
| `isMobile`  | 是否为手机号 |
| `isUrl`     | 是否URL地址  |

每一个验证型都包括着用于表单验证器：

```ts
this.valForm = fb.group({
  // 手机号
  mobile: [null, Validators.compose([Validators.required, _Validators.mobile])]
});
```
