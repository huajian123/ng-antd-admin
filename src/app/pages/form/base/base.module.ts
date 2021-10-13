import {NgModule} from '@angular/core';

import {BaseRoutingModule} from './base-routing.module';
import {BaseComponent} from './base.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [BaseComponent],
    imports: [
        SharedModule,
        BaseRoutingModule,
    ]
})
export class BaseModule {
}
