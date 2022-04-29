import {NgModule} from '@angular/core';
import {LazyBasicRoutingModule} from './lazy-basic-routing.module';
import {LazyBasicComponent} from './lazy-basic.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    LazyBasicComponent
  ],
  imports: [
    SharedModule,
    LazyBasicRoutingModule
  ]
})
export class LazyBasicModule {
}
