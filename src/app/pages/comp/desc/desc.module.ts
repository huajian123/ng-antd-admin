import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DescComponent} from "@app/pages/comp/desc/desc.component";
import {SharedModule} from "@shared/shared.module";
import {DescRoutingModule} from "@app/pages/comp/desc/desc-routing.module";



@NgModule({
  declarations: [
    DescComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DescRoutingModule
  ]
})
export class DescModule { }
