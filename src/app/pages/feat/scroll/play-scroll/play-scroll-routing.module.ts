import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlayScrollComponent } from '@app/pages/feat/scroll/play-scroll/play-scroll.component';

const routes: Routes = [{ path: '', component: PlayScrollComponent, data: { title: 'chơi với thanh cuộn', key: 'play-scroll' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayScrollRoutingModule {}
