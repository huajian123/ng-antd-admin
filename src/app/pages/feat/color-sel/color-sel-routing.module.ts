import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ColorSelComponent } from '@app/pages/feat/color-sel/color-sel.component';

const routes: Routes = [{ path: '', component: ColorSelComponent, data: { title: 'công cụ chọn màu', key: 'color-sel' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorSelRoutingModule {}
