import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DownloadComponent } from '@app/pages/feat/download/download.component';

const routes: Routes = [{ path: '', component: DownloadComponent, data: { title: '文件下载', key: 'download' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DownloadRoutingModule {}
