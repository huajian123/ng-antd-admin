import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExModalRoutingModule } from './ex-modal-routing.module';
import { ExModalComponent } from './ex-modal.component';
import {SharedModule} from "@shared/shared.module";
import {DragModule} from "@widget/biz-widget/drag/drag.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {NzxModalModule} from "@widget/modal/modal.module";


@NgModule({
  declarations: [
    ExModalComponent
  ],
  imports: [
    SharedModule,
    DragDropModule,
    DragModule,
    NzxModalModule,
    ExModalRoutingModule
  ]
})
export class ExModalModule { }
