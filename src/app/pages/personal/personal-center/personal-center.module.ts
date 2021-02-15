import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalCenterRoutingModule } from './personal-center-routing.module';
import { PersonalCenterComponent } from './personal-center.component';
import {SharedModule} from "../../../share/shared.module";
import {NzNoAnimationModule} from "ng-zorro-antd/core/no-animation";


@NgModule({
  declarations: [PersonalCenterComponent],
  imports: [
    CommonModule,
    SharedModule,
    PersonalCenterRoutingModule,
    NzNoAnimationModule
  ]
})
export class PersonalCenterModule { }
