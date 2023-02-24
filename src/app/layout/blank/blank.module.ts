import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlankRoutingModule } from './blank-routing.module';
import { BlankComponent } from './blank.component';

@NgModule({
    imports: [CommonModule, BlankRoutingModule, BlankComponent]
})
export class BlankModule {}
