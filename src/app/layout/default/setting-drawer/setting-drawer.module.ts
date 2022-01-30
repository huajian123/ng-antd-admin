import {NgModule} from '@angular/core';
import {SettingDrawerComponent} from './setting-drawer.component';
import {SharedModule} from "@shared/shared.module";
import {DragDropModule} from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [SettingDrawerComponent],
    imports: [
        SharedModule,
        DragDropModule
    ],
  exports: [
    SettingDrawerComponent
  ],
})
export class SettingDrawerModule {
}
