import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BaseComponent } from './base.component';

const routes: Routes = [{ path: '', component: BaseComponent, data: { title: '基础表单', key: 'base-form' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
