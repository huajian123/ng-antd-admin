import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IconsComponent } from '@app/pages/feat/icons/icons.component';

const routes: Routes = [{ path: '', component: IconsComponent, data: { title: 'Icons', key: 'icons' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule {}
