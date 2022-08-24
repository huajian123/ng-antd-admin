import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { SettingDrawerComponent } from './setting-drawer.component';

@NgModule({
  declarations: [SettingDrawerComponent],
  imports: [SharedModule, DragDropModule],
  exports: [SettingDrawerComponent]
})
export class SettingDrawerModule {}
