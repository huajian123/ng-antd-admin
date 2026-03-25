import { bootstrapApplication } from '@angular/platform-browser';

import { App } from '@app/app';
import { appConfig } from '@app/app.config';
import { environment } from './environments/environment';

async function bootstrap() {
  if (environment.mockEnabled) {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass', serviceWorker: { url: './mockServiceWorker.js' } });
  }
  bootstrapApplication(App, appConfig).catch(err => console.error(err));
}

bootstrap();
