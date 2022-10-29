import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { environment } from '@env/environment';

if (environment.production) {
  enableProdMode();
}
/*
 * https://netbasal.com/reduce-change-detection-cycles-with-event-coalescing-in-angular-c4037199859f
 * ngZoneEventCoalescing: true，ngZoneRunCoalescing: true
 * 第一个表示事件冒泡的变更检测合并，第二个表示事件循环的变更检测合并,可以提高性能，
 * 目前我观察到涉及到动态组件切换，或者一些关于视图销毁到操作，会让路由后面加个？，例如：localhost:4200/?#/blank/other-login/login1
 * 解决方法是 手动触发一次变更检测。项目内全文搜索"ngZoneEventCoalescing，ngZoneRunCoalescing例子,请查看main.ts"，我会将因为这个导致的变更检测问题，全部标记这个注释。
 * 如果你把握不住，可以删除{ ngZoneEventCoalescing: true, ngZoneRunCoalescing: true }，也无所谓
 * 如果你发现任何运行结果与你想象中的结果不一样时，请尝试使用this.cdr.detectChanges();手动触发一次变更检测,典型例子在"分步表单"中，点击"下一步"切换组件会有体现
 *
 * */
platformBrowserDynamic()
  .bootstrapModule(AppModule, { ngZoneEventCoalescing: true, ngZoneRunCoalescing: true })
  .catch(err => console.error(err));
