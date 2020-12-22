import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './default.component';

const routes: Routes = [
  {
    path: '', component: DefaultComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    /*  {
        path: 'form',
        loadChildren: () => import('../../pages/form/form.module').then(m => m.FormModule)
      },*/
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
