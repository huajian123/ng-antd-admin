import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DownloadRoutingModule } from './download-routing.module';
import { DownloadComponent } from './download.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    DownloadComponent
  ],
  imports: [
    SharedModule,
    DownloadRoutingModule
  ]
})
export class DownloadModule { }
