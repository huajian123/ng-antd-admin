import { NgModule } from '@angular/core';

import { RippleRoutingModule } from './ripple-routing.module';
import { RippleComponent } from './ripple.component';
import {SharedModule} from "@shared/shared.module";
import {ColorPickerModule} from "ngx-color-picker";
import {MatRippleModule} from "@angular/material/core";


@NgModule({
  declarations: [
    RippleComponent
  ],
  imports: [
    SharedModule,
    MatRippleModule,
    ColorPickerModule,
    RippleRoutingModule,

  ]
})
export class RippleModule { }
