import {NgModule} from '@angular/core';

import {TransitionRoutingModule} from './transition-routing.module';
import {TransitionComponent} from './transition.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    TransitionComponent
  ],
  imports: [
    SharedModule,
    TransitionRoutingModule
  ]
})
export class TransitionModule {
}
