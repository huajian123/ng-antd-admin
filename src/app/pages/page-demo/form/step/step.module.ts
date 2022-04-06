import {NgModule} from '@angular/core';
import {StepRoutingModule} from './step-routing.module';
import {StepComponent} from './step.component';
import {SharedModule} from '@shared/shared.module';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import {PortalModule} from "@angular/cdk/portal";

@NgModule({
  declarations: [StepComponent, StepOneComponent, StepTwoComponent, StepThreeComponent],
    imports: [
        SharedModule,
        StepRoutingModule,
        PortalModule,
    ]
})
export class StepModule {
}
