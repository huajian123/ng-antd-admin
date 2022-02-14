import {NgModule} from '@angular/core';
import {TreeListRoutingModule} from './tree-list-routing.module';
import {TreeListComponent} from './tree-list.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    TreeListComponent
  ],
  imports: [
    SharedModule,
    TreeListRoutingModule
  ]
})
export class TreeListModule {
}
