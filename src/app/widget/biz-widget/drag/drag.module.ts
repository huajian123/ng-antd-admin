import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragComponent } from './drag.component';
import {ModalWrapService} from "@widget/base-modal";
@NgModule({
  declarations: [
    DragComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [ModalWrapService]
})
export class DragModule { }
