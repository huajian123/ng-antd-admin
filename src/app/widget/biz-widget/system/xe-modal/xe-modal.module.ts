import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { XeModalComponent } from './xe-modal.component';

@NgModule({
  declarations: [
    XeModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class XeModalModule { }
