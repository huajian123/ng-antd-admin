import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { PasswordStrengthMeterComponent } from './password-strength-meter.component';
import { IPasswordStrengthMeterService, PasswordStrengthMeterService } from './password-strength-meter.service';
import { PSMProgressBarDirective } from './psm-progress-bar.directive';

interface PSMOptions {
  serviceClass: Type<IPasswordStrengthMeterService>;
}

const defaultOptions: PSMOptions = {
  serviceClass: PasswordStrengthMeterService
};

@NgModule({
  imports: [CommonModule, PasswordStrengthMeterComponent, PSMProgressBarDirective],
  exports: [PasswordStrengthMeterComponent, PSMProgressBarDirective]
})
export class PasswordStrengthMeterModule {
  static forRoot({ serviceClass }: PSMOptions = defaultOptions): ModuleWithProviders<PasswordStrengthMeterModule> {
    return {
      ngModule: PasswordStrengthMeterModule,
      providers: [
        {
          provide: IPasswordStrengthMeterService,
          useClass: serviceClass
        }
      ]
    };
  }

  static forChild(): ModuleWithProviders<PasswordStrengthMeterModule> {
    return {
      ngModule: PasswordStrengthMeterModule
    };
  }
}
