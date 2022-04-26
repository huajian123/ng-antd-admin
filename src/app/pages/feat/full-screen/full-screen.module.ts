import { NgModule } from '@angular/core';

import { FullScreenRoutingModule } from './full-screen-routing.module';
import { FullScreenComponent } from './full-screen.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    FullScreenComponent
  ],
  imports: [
    SharedModule,
    FullScreenRoutingModule
  ]
})
export class FullScreenModule { }
