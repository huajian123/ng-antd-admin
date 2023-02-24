import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { SearchTableDetailComponent } from './search-table-detail/search-table-detail.component';
import { SearchTableRoutingModule } from './search-table-routing.module';
import { SearchTableComponent } from './search-table.component';

@NgModule({
    imports: [CommonModule, SharedModule, SearchTableRoutingModule, SearchTableComponent, SearchTableDetailComponent]
})
export class SearchTableModule {}
