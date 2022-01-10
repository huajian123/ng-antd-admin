import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserManageComponent} from './user-manage.component';
import {JudgAuthGuard} from "@core/services/common/guard/judgAuth.guard";

const routes: Routes = [
  {
    path: '', component: UserManageComponent, data: {title: '用户管理', key: 'user-manage'},
    canActivate: [JudgAuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManageRoutingModule {
}
