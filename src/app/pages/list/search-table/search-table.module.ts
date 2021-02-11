import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchTableRoutingModule } from './search-table-routing.module';
import { SearchTableComponent } from './search-table.component';
import {SharedModule} from "../../../share/shared.module";


@NgModule({
  declarations: [SearchTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    SearchTableRoutingModule
  ]
})
export class SearchTableModule { }
