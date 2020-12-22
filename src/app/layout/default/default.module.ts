import { NgModule } from '@angular/core';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import {ContentModule} from './content/content.module';
import {ShareModule} from '../../share/share.module';


@NgModule({
  declarations: [DefaultComponent],
  imports: [
    ContentModule,
    ShareModule,
    DefaultRoutingModule
  ]
})
export class DefaultModule { }
