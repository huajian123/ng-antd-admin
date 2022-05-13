import {NgModule} from '@angular/core';

import {UploadRoutingModule} from './upload-routing.module';
import {UploadComponent} from './upload.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    SharedModule,
    UploadRoutingModule
  ]
})
export class UploadModule {
}
