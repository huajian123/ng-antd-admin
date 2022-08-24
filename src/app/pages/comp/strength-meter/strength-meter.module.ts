import { NgModule } from '@angular/core';

import { StrengthMeterRoutingModule } from '@app/pages/comp/strength-meter/strength-meter-routing.module';
import { StrengthMeterComponent } from '@app/pages/comp/strength-meter/strength-meter.component';
import { SharedModule } from '@shared/shared.module';
import { PasswordStrengthMeterModule } from 'angular-password-strength-meter';

@NgModule({
  declarations: [StrengthMeterComponent],
  imports: [StrengthMeterRoutingModule, SharedModule, PasswordStrengthMeterModule.forChild()]
})
export class StrengthMeterModule {}
