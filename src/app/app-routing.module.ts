import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  {path: 'default',  loadChildren: () => import('./layout/default/default.module').then(m => m.DefaultModule)},
  {path: '', redirectTo: '/login/login-form', pathMatch: 'full'},
  {path: '**', redirectTo: '/login/login-form'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
