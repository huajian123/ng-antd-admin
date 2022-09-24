/* eslint-disable prettier/prettier */
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './analysis.component';

@NgModule({
  declarations: [AnalysisComponent],
  imports: [SharedModule, AnalysisRoutingModule]
})
export class AnalysisModule {}
