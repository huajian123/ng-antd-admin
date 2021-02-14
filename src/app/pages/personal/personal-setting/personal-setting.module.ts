import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalSettingRoutingModule } from './personal-setting-routing.module';
import { PersonalSettingComponent } from './personal-setting.component';


@NgModule({
  declarations: [PersonalSettingComponent],
  imports: [
    CommonModule,
    PersonalSettingRoutingModule
  ]
})
export class PersonalSettingModule { }
