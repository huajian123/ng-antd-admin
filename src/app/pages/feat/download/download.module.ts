import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { DownloadRoutingModule } from './download-routing.module';
import { DownloadComponent } from './download.component';

@NgModule({
    imports: [SharedModule, DownloadRoutingModule, DownloadComponent]
})
export class DownloadModule {}
