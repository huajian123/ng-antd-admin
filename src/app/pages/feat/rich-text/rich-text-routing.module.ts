import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RichTextComponent } from '@app/pages/feat/rich-text/rich-text.component';

const routes: Routes = [{ path: '', component: RichTextComponent, data: { title: 'văn bản đa dạng thức', key: 'rich-text' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RichTextRoutingModule {}
