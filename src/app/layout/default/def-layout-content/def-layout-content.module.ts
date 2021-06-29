import {NgModule} from '@angular/core';
import {DefLayoutContentComponent} from './def-layout-content.component';
import {SharedModule} from '../../../share/shared.module';
import {SettingDrawerModule} from '../setting-drawer/setting-drawer.module';


@NgModule({
  declarations: [DefLayoutContentComponent],
  imports: [
    SettingDrawerModule,
    SharedModule
  ],
  exports: [DefLayoutContentComponent]
})
export class DefLayoutContentModule {
}
