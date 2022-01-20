import { Component, ChangeDetectionStrategy } from '@angular/core';

/*此组件为了解决锁屏时f12仍然能查看到被隐藏的页面，而创建的空白页面*/
@Component({
  selector: 'app-empty-for-lock',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyForLockComponent {}
