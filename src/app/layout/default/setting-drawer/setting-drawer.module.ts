import {NgModule} from '@angular/core';
import {SettingDrawerComponent} from './setting-drawer.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [SettingDrawerComponent],
  imports: [
    SharedModule
  ],
  exports: [
    SettingDrawerComponent
  ],
})
export class SettingDrawerModule {
}
