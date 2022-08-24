import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { StepOneComponent } from './step-one/step-one.component';
import { StepRoutingModule } from './step-routing.module';
import { StepThreeComponent } from './step-three/step-three.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepComponent } from './step.component';

@NgModule({
  declarations: [StepComponent, StepOneComponent, StepTwoComponent, StepThreeComponent],
  imports: [SharedModule, StepRoutingModule, PortalModule]
})
export class StepModule {}
