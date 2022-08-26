import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { CardTableRoutingModule } from './card-table-routing.module';
import { CardTableComponent } from './card-table.component';

@NgModule({
  declarations: [CardTableComponent],
  imports: [SharedModule, CardTableRoutingModule]
})
export class CardTableModule {}
