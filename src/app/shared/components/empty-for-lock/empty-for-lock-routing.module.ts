import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmptyForLockComponent } from '@shared/components/empty-for-lock/empty-for-lock.component';

const routes: Routes = [
  { path: '', component: EmptyForLockComponent, data: { title: '空页面', key: 'empty-for-lock', shouldDetach: 'no' } },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmptyForLockRoutingModule {}
