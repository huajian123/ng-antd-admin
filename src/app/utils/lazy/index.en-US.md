---
title: lazy
subtitle: Lazy load
type: Type
---

`LazyService` delay loading JS or CSS files.

```ts
import { LazyService } from '@delon/util';

export class AppComponent {
  constructor(private lazy: LazyService) {}

  ngOnInit() {
    this.lazy.load([ `//cdn.bootcss.com/xlsx/0.11.17/xlsx.full.min.js` ]).then(() => {
      // do something
    });
  }
}
```
