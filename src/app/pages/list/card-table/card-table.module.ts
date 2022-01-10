import { NgModule } from '@angular/core';
import { CardTableRoutingModule } from './card-table-routing.module';
import { CardTableComponent } from './card-table.component';
import {SharedModule} from '@shared/shared.module';


@NgModule({
  declarations: [CardTableComponent],
  imports: [
    SharedModule,
    CardTableRoutingModule
  ]
})
export class CardTableModule { }
