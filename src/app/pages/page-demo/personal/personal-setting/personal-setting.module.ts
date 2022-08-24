import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { BaseComponent } from './base/base.component';
import { BindComponent } from './bind/bind.component';
import { NoticeComponent } from './notice/notice.component';
import { PersonalSettingRoutingModule } from './personal-setting-routing.module';
import { PersonalSettingComponent } from './personal-setting.component';
import { SafeComponent } from './safe/safe.component';

@NgModule({
  declarations: [PersonalSettingComponent, BaseComponent, SafeComponent, BindComponent, NoticeComponent],
  imports: [CommonModule, SharedModule, PersonalSettingRoutingModule]
})
export class PersonalSettingModule {}
