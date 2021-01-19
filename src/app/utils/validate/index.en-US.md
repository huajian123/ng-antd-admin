---
title: Validate
type: Type
---

## API

| Method      | Description                  |
|-------------|------------------------------|
| `isNum`     | Whether number               |
| `isInt`     | Whether integer              |
| `isDecimal` | Whether decimal              |
| `isIdCard`  | Whether IDCard(Chinese User) |
| `isMobile`  | Whether mobile(Chinese User) |
| `isUrl`     | Whether URL Address          |

Every method has a corresponding form validation:

```ts
this.valForm = fb.group({
  // is mobile
  mobile: [null, Validators.compose([Validators.required, _Validators.mobile])]
});
```
