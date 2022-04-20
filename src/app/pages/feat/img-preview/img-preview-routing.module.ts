import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImgPreviewComponent} from "@app/pages/feat/img-preview/img-preview.component";

const routes: Routes = [
  {path: '', component: ImgPreviewComponent, data: {title: '图片预览', key: 'img-preview'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImgPreviewRoutingModule { }
