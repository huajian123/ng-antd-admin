import { NgModule } from '@angular/core';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './analysis.component';
import {ShareModule} from '../../../share/share.module';


@NgModule({
  declarations: [AnalysisComponent],
  imports: [
    ShareModule,
    AnalysisRoutingModule
  ]
})
export class AnalysisModule { }
