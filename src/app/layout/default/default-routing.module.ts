import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultComponent} from "./default.component";
import {JudgLoginGuard} from "@core/services/common/guard/judgLogin.guard";

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
        path: 'page-demo',
        loadChildren: () => import('../../pages/page-demo/page-demo.module').then(m => m.PageDemoModule)
      },
      {
        path: 'internal-manage',
        loadChildren: () => import('../../pages/internal-manage/internal-manage.module').then(m => m.InternalManageModule)
      },
      {
        path: 'feat',
        loadChildren: () => import('../../pages/feat/feat.module').then(m => m.FeatModule)
      },
      {
        path: 'comp',
        loadChildren: () => import('../../pages/comp/comp.module').then(m => m.CompModule)
      },
      {
        path: 'level',
        loadChildren: () => import('../../pages/level/level.module').then(m => m.LevelModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../../pages/about/about.module').then(m => m.AboutModule)
      },
      {
        path: 'system',
        loadChildren: () => import('../../pages/system/system.module').then(m => m.SystemModule)
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
