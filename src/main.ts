import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from '@app/app.module';
import { environment } from '@env/environment';

if (environment.production) {
  enableProdMode();
}
/*
 * https://netbasal.com/reduce-change-detection-cycles-with-event-coalescing-in-angular-c4037199859f
 * ngZoneEventCoalescing: true
 * 第一个表示事件冒泡的变更检测合并，第二个表示事件循环的变更检测合并
 * */
platformBrowserDynamic()
  .bootstrapModule(AppModule, { ngZoneEventCoalescing: true, ngZoneRunCoalescing: true })
  .catch(err => console.error(err));
