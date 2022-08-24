import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { DragModule } from '@widget/biz-widget/drag/drag.module';
import { NzxModalModule } from '@widget/modal/modal.module';

import { ExModalRoutingModule } from './ex-modal-routing.module';
import { ExModalComponent } from './ex-modal.component';

@NgModule({
  declarations: [ExModalComponent],
  imports: [SharedModule, DragDropModule, DragModule, NzxModalModule, ExModalRoutingModule]
})
export class ExModalModule {}
