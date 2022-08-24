import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'zorro-doc', loadChildren: () => import('./zorro-doc/zorro-doc.module').then(m => m.ZorroDocModule) },
  { path: '', redirectTo: 'zorro-doc', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrameRoutingModule {}
