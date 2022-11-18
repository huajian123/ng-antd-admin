import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewkhRoutingModule } from './newkh-routing.module';
import { NewkhComponent } from './newkh.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    NewkhComponent
  ],
  imports: [
    CommonModule,
    NewkhRoutingModule,
    SharedModule
  ]
})
export class NewkhModule { }
