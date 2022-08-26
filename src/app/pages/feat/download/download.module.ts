import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { DownloadRoutingModule } from './download-routing.module';
import { DownloadComponent } from './download.component';

@NgModule({
  declarations: [DownloadComponent],
  imports: [SharedModule, DownloadRoutingModule]
})
export class DownloadModule {}
