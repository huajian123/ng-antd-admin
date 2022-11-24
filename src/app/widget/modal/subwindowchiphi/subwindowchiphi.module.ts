import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubwindowchiphiComponent } from './subwindowchiphi.component';
import { SharedModule } from '@app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
   
    SubwindowchiphiComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SubwindowchiphiModule { }
