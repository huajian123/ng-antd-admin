import {NgModule} from '@angular/core';

import {TransitionRoutingModule} from './transition-routing.module';
import {TransitionComponent} from './transition.component';
import {SharedModule} from "@shared/shared.module";
import { AngularImgComponent } from './angular-img/angular-img.component';
import { DemoDynamicParamsComponent } from './demo-dynamic-params/demo-dynamic-params.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { DemoMainComponent } from './demo-main/demo-main.component';
import { DemoOnEnterOnLeaveComponent } from './demo-on-enter-on-leave/demo-on-enter-on-leave.component';
import { ExperimentsComponent } from './experiments/experiments.component';


@NgModule({
  declarations: [
    TransitionComponent,
    AngularImgComponent,
    DemoDynamicParamsComponent,
    DemoMainComponent,
    DemoOnEnterOnLeaveComponent,
    ExperimentsComponent
  ],
  imports: [
    SharedModule,
    TransitionRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class TransitionModule {
}
