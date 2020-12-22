import { NgModule } from '@angular/core';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import {ContentModule} from './content/content.module';


@NgModule({
  declarations: [DefaultComponent],
  imports: [
    ContentModule,
    DefaultRoutingModule
  ]
})
export class DefaultModule { }
