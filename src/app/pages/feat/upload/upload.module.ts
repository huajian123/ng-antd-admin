import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './upload.component';

@NgModule({
    imports: [SharedModule, UploadRoutingModule, UploadComponent]
})
export class UploadModule {}
