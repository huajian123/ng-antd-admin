import { NgModule } from '@angular/core';

import { StrengthMeterRoutingModule } from '@app/pages/comp/strength-meter/strength-meter-routing.module';
import { StrengthMeterComponent } from '@app/pages/comp/strength-meter/strength-meter.component';
import { PasswordStrengthMeterModule } from '@app/shared/biz-components/password-strength-meter/password-strength-meter.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [StrengthMeterComponent],
  imports: [StrengthMeterRoutingModule, SharedModule, PasswordStrengthMeterModule.forChild()]
})
export class StrengthMeterModule {}
