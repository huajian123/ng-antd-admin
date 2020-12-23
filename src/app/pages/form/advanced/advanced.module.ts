import { NgModule } from '@angular/core';

import { AdvancedRoutingModule } from './advanced-routing.module';
import { AdvancedComponent } from './advanced.component';

import {SharedModule} from '../../../share/shared.module';



@NgModule({
  declarations: [AdvancedComponent],
  imports: [
    SharedModule,
    AdvancedRoutingModule
  ]
})
export class AdvancedModule { }
