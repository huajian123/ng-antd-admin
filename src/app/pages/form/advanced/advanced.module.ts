import { NgModule } from '@angular/core';

import { AdvancedRoutingModule } from './advanced-routing.module';
import { AdvancedComponent } from './advanced.component';

import {CommonModule} from '@angular/common';
import {SharedModule} from '../../../share/shared.module';



@NgModule({
  declarations: [AdvancedComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdvancedRoutingModule
  ]
})
export class AdvancedModule { }
