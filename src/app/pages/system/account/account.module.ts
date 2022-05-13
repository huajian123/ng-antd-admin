import {NgModule} from '@angular/core';

import {AccountRoutingModule} from './account-routing.module';
import {AccountComponent} from './account.component';
import {SharedModule} from "@shared/shared.module";
import {AccountModalModule} from '@app/widget/biz-widget/system/account-modal/account-modal.module';
import { DeptTreeComponent } from './dept-tree/dept-tree.component';
import {NzHighlightModule} from "ng-zorro-antd/core/highlight";


@NgModule({
  declarations: [
    AccountComponent,
    DeptTreeComponent
  ],
  imports: [
    AccountModalModule,
    SharedModule,
    AccountRoutingModule,
    NzHighlightModule
  ]
})
export class AccountModule {
}
