import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from "@app/pages/feat/editor/editor.component";

const routes: Routes = [
  {path: '', component: EditorComponent, data: {title: '代码编辑器', key: 'editor'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
