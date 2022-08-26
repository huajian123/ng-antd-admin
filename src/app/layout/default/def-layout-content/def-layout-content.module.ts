import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';

import { SettingDrawerModule } from '../setting-drawer/setting-drawer.module';
import { DefLayoutContentComponent } from './def-layout-content.component';

@NgModule({
  declarations: [DefLayoutContentComponent],
  imports: [SharedModule, SettingDrawerModule, NzNoAnimationModule],
  exports: [DefLayoutContentComponent]
})
export class DefLayoutContentModule {}
