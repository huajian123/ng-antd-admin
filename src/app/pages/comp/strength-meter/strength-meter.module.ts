import { NgModule } from '@angular/core';
import {StrengthMeterComponent} from "@app/pages/comp/strength-meter/strength-meter.component";
import {strengthMeterRoutingModule} from "@app/pages/comp/strength-meter/strength-meter-routing.module";
import {SharedModule} from "@shared/shared.module";
import {PasswordStrengthMeterModule} from "angular-password-strength-meter";



@NgModule({
  declarations: [
    StrengthMeterComponent
  ],
  imports: [
    strengthMeterRoutingModule,
    SharedModule,
    PasswordStrengthMeterModule.forChild(),
  ]
})
export class StrengthMeterModule { }
