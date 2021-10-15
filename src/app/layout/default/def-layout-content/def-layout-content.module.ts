import {NgModule} from '@angular/core';
import {DefLayoutContentComponent} from './def-layout-content.component';
import {SharedModule} from "../../../shared/shared.module";
import {SettingDrawerModule} from "../setting-drawer/setting-drawer.module";
import {NzNoAnimationModule} from "ng-zorro-antd/core/no-animation";


@NgModule({
  declarations: [
    DefLayoutContentComponent
  ],
  imports: [
    SharedModule,
    SettingDrawerModule,
    NzNoAnimationModule,
  ],
  exports: [DefLayoutContentComponent]
})
export class DefLayoutContentModule {
}
