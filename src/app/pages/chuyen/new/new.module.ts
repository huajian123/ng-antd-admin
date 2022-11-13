import { NgModule } from '@angular/core';

import { NewRoutingModule } from './new-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { NewComponent } from './new.component';
import { SubwindowxeModule } from '@app/widget/modal/subwindowxe/subwindowxe.module';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { SubwindowtaixeModule } from '../../../widget/modal/subwindowtaixe/subwindowtaixe.module';
import { SubwindowchuyenModule } from '@app/widget/modal/subwindowchuyen/subwindowchuyen.module';


@NgModule({
  declarations: [
    NewComponent
  ],
  imports: [
    NewRoutingModule,
    SharedModule,
    SubwindowxeModule,
    SubwindowtaixeModule,
    SubwindowchuyenModule,
    NzHighlightModule
  ],
  
})
export class NewModule { }
