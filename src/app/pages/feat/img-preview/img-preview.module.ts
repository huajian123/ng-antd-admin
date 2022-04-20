import { NgModule } from '@angular/core';

import { ImgPreviewRoutingModule } from './img-preview-routing.module';
import { ImgPreviewComponent } from './img-preview.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    ImgPreviewComponent
  ],
  imports: [
    SharedModule,
    ImgPreviewRoutingModule
  ]
})
export class ImgPreviewModule { }
