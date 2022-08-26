import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { TreeListRoutingModule } from './tree-list-routing.module';
import { TreeListComponent } from './tree-list.component';

@NgModule({
  declarations: [TreeListComponent],
  imports: [SharedModule, TreeListRoutingModule]
})
export class TreeListModule {}
