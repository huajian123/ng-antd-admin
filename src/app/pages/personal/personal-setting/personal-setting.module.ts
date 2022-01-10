import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonalSettingRoutingModule} from './personal-setting-routing.module';
import {PersonalSettingComponent} from './personal-setting.component';
import {SharedModule} from '@shared/shared.module';
import {BaseComponent} from './base/base.component';
import {SafeComponent} from './safe/safe.component';
import {BindComponent} from './bind/bind.component';
import {NoticeComponent} from './notice/notice.component';


@NgModule({
  declarations: [PersonalSettingComponent, BaseComponent, SafeComponent, BindComponent, NoticeComponent],
  imports: [
    CommonModule,
    SharedModule,
    PersonalSettingRoutingModule
  ]
})
export class PersonalSettingModule {
}
