import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CopyComponent} from "@app/pages/feat/copy/copy.component";

const routes: Routes = [
  {path: '', component: CopyComponent, data: {title: '剪切板', key: 'copy'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopyRoutingModule { }
