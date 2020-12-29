---
title: lazy
subtitle: 延迟加载
type: Type
---

`LazyService` 用于延迟加载 JS 或 CSS 文件，对于无须被打包 script.js 且又是第三方类库比较大时，非常有用，一个简单的用法，例如：

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
