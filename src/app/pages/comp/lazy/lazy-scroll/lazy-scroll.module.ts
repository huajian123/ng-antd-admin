import { NgModule } from '@angular/core';

import { LazyScrollRoutingModule } from './lazy-scroll-routing.module';
import { LazyScrollComponent } from './lazy-scroll.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    LazyScrollComponent
  ],
  imports: [
    SharedModule,
    LazyScrollRoutingModule
  ]
})
export class LazyScrollModule { }
