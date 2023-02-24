import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { ImgPreviewRoutingModule } from './img-preview-routing.module';
import { ImgPreviewComponent } from './img-preview.component';

@NgModule({
    imports: [SharedModule, ImgPreviewRoutingModule, ImgPreviewComponent]
})
export class ImgPreviewModule {}
