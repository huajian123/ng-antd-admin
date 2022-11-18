import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubwindowproductComponent } from './subwindowproduct.component';
import { SharedModule } from '@app/shared/shared.module';



@NgModule({
  declarations: [
    SubwindowproductComponent
  ],
  imports: [
    SharedModule
  ]
})
export class SubwindowproductModule { }
