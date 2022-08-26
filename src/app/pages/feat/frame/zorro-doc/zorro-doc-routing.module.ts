import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ZorroDocComponent } from '@app/pages/feat/frame/zorro-doc/zorro-doc.component';

const routes: Routes = [{ path: '', component: ZorroDocComponent, data: { title: 'zorro文档', key: 'zorro-doc' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZorroDocRoutingModule {}
