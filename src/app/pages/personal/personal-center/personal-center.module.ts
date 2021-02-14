import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalCenterRoutingModule } from './personal-center-routing.module';
import { PersonalCenterComponent } from './personal-center.component';


@NgModule({
  declarations: [PersonalCenterComponent],
  imports: [
    CommonModule,
    PersonalCenterRoutingModule
  ]
})
export class PersonalCenterModule { }
