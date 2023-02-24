import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

import { SharedModule } from '@shared/shared.module';
import { ColorPickerModule } from 'ngx-color-picker';

import { RippleRoutingModule } from './ripple-routing.module';
import { RippleComponent } from './ripple.component';

@NgModule({
    imports: [SharedModule, MatRippleModule, ColorPickerModule, RippleRoutingModule, RippleComponent]
})
export class RippleModule {}
