import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login-form.component';

const routes: Routes = [{ path: '', data: { key: 'login-form', shouldDetach: 'no' }, component: LoginFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginFormRoutingModule {}
