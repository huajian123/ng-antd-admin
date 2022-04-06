import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AboutComponent} from "@app/pages/about/about.component";

const routes: Routes = [
  {path: '', component: AboutComponent, data: {title: '关于', key: 'about'}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
