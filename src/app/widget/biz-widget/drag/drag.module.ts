import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalWrapService } from '@widget/base-modal';

import { DragComponent } from './drag.component';

@NgModule({
  declarations: [DragComponent],
  imports: [CommonModule],
  providers: [ModalWrapService]
})
export class DragModule {}
