import { NgModule } from '@angular/core';
import { DatascModalModule } from '@app/widget/biz-widget/system/datasc-modal/datasc-modal.module';
import { SharedModule } from '@shared/shared.module';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';

import { DatascRoutingModule } from './datasc-routing.module';
import { DatascComponent } from './datasc.component';
import { MenuTreeComponent } from './menu-tree/menu-tree.component';


@NgModule({
  declarations: [
    DatascComponent,
    MenuTreeComponent
  ],
  imports: [
    SharedModule,
    DatascRoutingModule,
    NzHighlightModule,
    DatascModalModule
  ]
})
export class DatascModule { }
