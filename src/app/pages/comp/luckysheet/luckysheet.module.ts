import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { LuckysheetRoutingModule } from './luckysheet-routing.module';
import { LuckysheetComponent } from './luckysheet.component';

@NgModule({
  declarations: [LuckysheetComponent],
  imports: [SharedModule, LuckysheetRoutingModule]
})
export class LuckysheetModule {}
