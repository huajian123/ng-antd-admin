import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: { key: 'login', shouldDetach: 'no' },
    children: [
      { path: '', redirectTo: '/login/login-form', pathMatch: 'full' },
      {
        path: 'login-form',
        data: { preload: true },
        loadChildren: () => import('./login-form/login-form.module').then(m => m.LoginFormModule)
      },
      {
        path: 'register-form',
        loadChildren: () => import('./register-form/register-form.module').then(m => m.RegisterFormModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {}
