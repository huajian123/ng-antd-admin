import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalSettingRoutingModule } from './personal-setting-routing.module';
import { PersonalSettingComponent } from './personal-setting.component';
import {SharedModule} from "../../../share/shared.module";


@NgModule({
  declarations: [PersonalSettingComponent],
  imports: [
    CommonModule,
    SharedModule,
    PersonalSettingRoutingModule
  ]
})
export class PersonalSettingModule { }
