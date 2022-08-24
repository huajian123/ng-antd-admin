import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterFormComponent } from './register-form.component';

const routes: Routes = [{ path: '', data: { key: 'register-form', shouldDetach: 'no' }, component: RegisterFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterFormRoutingModule {}
