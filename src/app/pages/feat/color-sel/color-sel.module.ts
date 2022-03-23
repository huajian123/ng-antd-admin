import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorSelRoutingModule } from './color-sel-routing.module';
import { ColorSelComponent } from './color-sel.component';
import {ColorPickerModule} from "ngx-color-picker";
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    ColorSelComponent
  ],
  imports: [
    ColorPickerModule,
    SharedModule,
    ColorSelRoutingModule
  ]
})
export class ColorSelModule { }
