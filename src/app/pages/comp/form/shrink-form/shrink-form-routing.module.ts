import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShrinkFormComponent } from '@app/pages/comp/form/shrink-form/shrink-form.component';

const routes: Routes = [{ path: '', component: ShrinkFormComponent, data: { title: '可伸缩表单', key: 'shrink-form' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShrinkFormRoutingModule {}
