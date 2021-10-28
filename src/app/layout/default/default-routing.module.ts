import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from "./default.component";
import {JudgLoginGuard} from "../../core/services/common/guard/judgLogin.guard";

const routes: Routes = [
  {
    path: '', component: DefaultComponent, data: {shouldDetach: 'no'},
    canActivate: [JudgLoginGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'form',
        loadChildren: () => import('../../pages/form/form.module').then(m => m.FormModule)
      },
      {
        path: 'detail',
        loadChildren: () => import('../../pages/detail/detail.module').then(m => m.DetailModule)
      },
      {
        path: 'list',
        loadChildren: () => import('../../pages/list/list.module').then(m => m.ListModule)
      },
      {
        path: 'personal',
        loadChildren: () => import('../../pages/personal/personal.module').then(m => m.PersonalModule)
      },
      {
        path: 'except',
        loadChildren: () => import('../../pages/except/except.module').then(m => m.ExceptModule)
      },
      {
        path: 'result',
        loadChildren: () => import('../../pages/result/result.module').then(m => m.ResultModule)
      },
      {
        path: 'internal-manage',
        loadChildren: () => import('../../pages/internal-manage/internal-manage.module').then(m => m.InternalManageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../../pages/about/about.module').then(m => m.AboutModule)
      },
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule {
}
