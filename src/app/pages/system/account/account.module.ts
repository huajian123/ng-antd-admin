import { NgModule } from '@angular/core';

import { AccountModalModule } from '@app/widget/biz-widget/system/account-modal/account-modal.module';
import { SharedModule } from '@shared/shared.module';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { DeptTreeComponent } from './dept-tree/dept-tree.component';

@NgModule({
  declarations: [AccountComponent, DeptTreeComponent],
  imports: [AccountModalModule, SharedModule, AccountRoutingModule, NzHighlightModule]
})
export class AccountModule {}
