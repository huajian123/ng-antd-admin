import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlankComponent} from './blank.component';

const routes: Routes = [
  {
    path: '', component: BlankComponent, data: {key: 'blank', shouldDetach: 'no'}, children: [
      {
        path: 'empty-page',
        loadChildren: () => import('../../pages/empty/empty.module').then(m => m.EmptyModule)
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
