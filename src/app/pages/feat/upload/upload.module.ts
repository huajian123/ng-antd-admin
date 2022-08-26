import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';

@NgModule({
  declarations: [UploadComponent],
  imports: [SharedModule, UploadRoutingModule]
})
export class UploadModule {}
