import { NgModule } from '@angular/core';
import { StandardTableRoutingModule } from './standard-table-routing.module';
import { StandardTableComponent } from './standard-table.component';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [StandardTableComponent],
  imports: [
    SharedModule,
    StandardTableRoutingModule,
  ]
})
export class StandardTableModule { }
