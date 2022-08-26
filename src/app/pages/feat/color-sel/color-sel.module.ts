import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';

import { ColorSelRoutingModule } from './color-sel-routing.module';
import { ColorSelComponent } from './color-sel.component';

@NgModule({
  declarations: [ColorSelComponent],
  imports: [ColorPickerModule, SharedModule, ColorSelRoutingModule]
})
export class ColorSelModule {}
