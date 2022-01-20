import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlankComponent} from './blank.component';
import {LockLeaveGuard} from "@core/services/common/guard/lock-leave.guard";

const routes: Routes = [
  {
    path: '', component: BlankComponent, data: {key: 'blank', shouldDetach: 'no'}, children: [
      {
        path: 'empty-page',
        loadChildren: () => import('../../pages/empty/empty.module').then(m => m.EmptyModule)
      },
      {
        canDeactivate: [LockLeaveGuard],
        path: 'empty-for-lock',
        loadChildren: () => import('../../pages/empty-for-lock/empty-for-lock.module').then(m => m.EmptyForLockModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlankRoutingModule {
}
