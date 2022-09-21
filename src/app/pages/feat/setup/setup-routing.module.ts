import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SetupComponent } from '@app/pages/feat/setup/setup.component';

const routes: Routes = [{ path: '', component: SetupComponent, data: { title: 'Trang hướng dẫn', key: 'setup' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}
