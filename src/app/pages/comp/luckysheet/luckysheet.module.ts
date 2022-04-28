import { NgModule } from '@angular/core';

import { LuckysheetRoutingModule } from './luckysheet-routing.module';
import { LuckysheetComponent } from './luckysheet.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    LuckysheetComponent
  ],
  imports: [
    SharedModule,
    LuckysheetRoutingModule
  ]
})
export class LuckysheetModule { }
