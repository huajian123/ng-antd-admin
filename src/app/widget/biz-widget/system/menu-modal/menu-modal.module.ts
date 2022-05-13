import {NgModule} from '@angular/core';
import {MenuModalComponent} from './menu-modal.component';
import {SharedModule} from "@shared/shared.module";
import {IconSelModule} from "@shared/biz-components/icon-sel/icon-sel.module";


@NgModule({
  declarations: [
    MenuModalComponent
  ],
  imports: [
    IconSelModule,
    SharedModule
  ]
})
export class MenuModalModule {
}
