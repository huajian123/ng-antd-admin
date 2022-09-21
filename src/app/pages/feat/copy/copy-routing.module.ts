import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CopyComponent } from '@app/pages/feat/copy/copy.component';

const routes: Routes = [{ path: '', component: CopyComponent, data: { title: 'bìa kẹp hồ sơ', key: 'copy' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopyRoutingModule {}
