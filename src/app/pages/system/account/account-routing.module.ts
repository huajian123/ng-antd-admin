import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AccountComponent} from "@app/pages/system/account/account.component";

const routes: Routes = [
  {
    path: '', component: AccountComponent, data: {title: '账号管理', key: 'account'},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
