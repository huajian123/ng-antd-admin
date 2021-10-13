import {NgModule} from '@angular/core';
import {SettingDrawerComponent} from './setting-drawer.component';
import {SharedModule} from "../../../shared/shared.module";


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
