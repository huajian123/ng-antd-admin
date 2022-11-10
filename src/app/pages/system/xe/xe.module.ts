import { NgModule } from '@angular/core';
import { XeModalModule } from '@app/widget/biz-widget/system/xe-modal/xe-modal.module';
import { XeRoutingModule } from './xe-routing.module';
import { XeComponent } from './xe.component';
import { SharedModule } from '@shared/shared.module';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';


@NgModule({
  declarations: [
    XeComponent
  ],
  imports: [
    SharedModule,
    XeModalModule,
    XeRoutingModule,
    NzHighlightModule
  ]
})
export class XeModule { }
