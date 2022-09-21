import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from '@app/pages/feat/editor/editor.component';

const routes: Routes = [{ path: '', component: EditorComponent, data: { title: 'biên tập mã', key: 'editor' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule {}
