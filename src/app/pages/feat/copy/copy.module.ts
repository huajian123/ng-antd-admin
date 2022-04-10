import { NgModule } from '@angular/core';

import { CopyRoutingModule } from './copy-routing.module';
import { CopyComponent } from './copy.component';
import {SharedModule} from "@shared/shared.module";
import {ClipboardModule} from "@angular/cdk/clipboard";


@NgModule({
  declarations: [
    CopyComponent
  ],
  imports: [
    SharedModule,
    CopyRoutingModule,
    ClipboardModule
  ]
})
export class CopyModule { }
