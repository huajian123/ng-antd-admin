import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from '@app/app.component';
import { appConfig } from '@app/app.config';

// bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));

async function prepareApp(): Promise<ServiceWorkerRegistration | undefined> {
  const { worker } = await import('./mocks/browser');
  return worker.start({
    serviceWorker: {
      url: './mockServiceWorker.js'
    }
  });
}

// 启动mock数据
prepareApp().then(() => {
  bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
});
