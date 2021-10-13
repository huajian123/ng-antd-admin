import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchTableRoutingModule} from './search-table-routing.module';
import {SearchTableComponent} from './search-table.component';
import {SharedModule} from '../../../shared/shared.module';
import { SearchTableDetailComponent } from './search-table-detail/search-table-detail.component';


@NgModule({
  declarations: [SearchTableComponent, SearchTableDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    SearchTableRoutingModule
  ]
})
export class SearchTableModule {
}
