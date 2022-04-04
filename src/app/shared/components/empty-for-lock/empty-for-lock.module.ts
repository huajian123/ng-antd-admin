import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyForLockRoutingModule } from './empty-for-lock-routing.module';
import { EmptyForLockComponent } from './empty-for-lock.component';


@NgModule({
  declarations: [
    EmptyForLockComponent
  ],
  imports: [
    CommonModule,
    EmptyForLockRoutingModule
  ]
})
export class EmptyForLockModule { }
