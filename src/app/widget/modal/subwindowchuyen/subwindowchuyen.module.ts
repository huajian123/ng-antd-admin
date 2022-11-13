import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubwindowchuyenComponent } from './subwindowchuyen.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [
    SubwindowchuyenComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SubwindowchuyenModule { }
