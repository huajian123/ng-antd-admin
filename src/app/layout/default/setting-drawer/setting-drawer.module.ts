import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { SettingDrawerComponent } from './setting-drawer.component';

@NgModule({
    imports: [SharedModule, DragDropModule, SettingDrawerComponent],
    exports: [SettingDrawerComponent]
})
export class SettingDrawerModule {}
