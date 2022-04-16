import { NgModule } from '@angular/core';

import { PlayScrollRoutingModule } from './play-scroll-routing.module';
import { PlayScrollComponent } from './play-scroll.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    PlayScrollComponent
  ],
  imports: [
    SharedModule,
    PlayScrollRoutingModule
  ]
})
export class PlayScrollModule { }
