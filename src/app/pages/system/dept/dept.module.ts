import {NgModule} from '@angular/core';

import {DeptRoutingModule} from './dept-routing.module';
import {DeptComponent} from './dept.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    DeptComponent
  ],
  imports: [
    SharedModule,
    DeptRoutingModule
  ]
})
export class DeptModule {
}
