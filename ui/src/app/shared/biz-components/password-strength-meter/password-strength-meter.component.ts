import { Component, OnChanges, SimpleChanges, HostBinding, booleanAttribute, numberAttribute, inject, input, output } from '@angular/core';

import { PasswordStrengthMeterService } from './password-strength-meter.service';
import { PSMProgressBarDirective } from './psm-progress-bar.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
  styleUrls: ['./password-strength-meter.component.less'],
  providers: [PasswordStrengthMeterService],
  imports: [PSMProgressBarDirective]
})
export class PasswordStrengthMeterComponent implements OnChanges {
  readonly password = input<string>();

  readonly minPasswordLength = input(8, { transform: numberAttribute });

  readonly enableFeedback = input(false, { transform: booleanAttribute });

  readonly colors = input<string[]>([]);

  readonly numberOfProgressBarItems = input(5, { transform: numberAttribute });

  readonly strengthChange = output<number>();

  @HostBinding('class') baseClass = 'psm';

  passwordStrength: number | null = null;

  feedback: { suggestions: string[]; warning: string } | null = null;

  private prevPasswordStrength: number | null = null;

  private passwordStrengthMeterService = inject(PasswordStrengthMeterService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password']) {
      this.calculatePasswordStrength();
    }
  }

  private calculatePasswordStrength(): void {
    // TODO validation logic optimization
    const password = this.password();
    if (!password) {
      this.passwordStrength = null;
      this.feedback = null;
    } else if (password && password.length < this.minPasswordLength()) {
      this.passwordStrength = 0;
      this.feedback = null;
    } else {
      if (this.enableFeedback()) {
        const result = this.passwordStrengthMeterService.scoreWithFeedback(password);
        this.passwordStrength = result.score;
        this.feedback = result.feedback;
      } else {
        this.passwordStrength = this.passwordStrengthMeterService.score(password);
        this.feedback = null;
      }
    }

    // Only emit the passwordStrength if it changed
    if (this.prevPasswordStrength !== this.passwordStrength) {
      this.strengthChange.emit(this.passwordStrength!);
      this.prevPasswordStrength = this.passwordStrength;
    }
  }
}
