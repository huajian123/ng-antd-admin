import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { CardTableRoutingModule } from './card-table-routing.module';
import { CardTableComponent } from './card-table.component';

@NgModule({
    imports: [SharedModule, CardTableRoutingModule, CardTableComponent]
})
export class CardTableModule {}
