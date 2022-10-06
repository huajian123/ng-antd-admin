import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu1', pathMatch: 'full' },
  { path: 'menu1', loadChildren: () => import('./menu1/menu1.module').then(m => m.Menu1Module) },
  { path: 'menu2', loadChildren: () => import('./menu2/menu2.module').then(m => m.Menu2Module) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LevelRoutingModule {}
