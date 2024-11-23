import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, HostBinding, booleanAttribute, numberAttribute, inject } from '@angular/core';

import { PasswordStrengthMeterService } from './password-strength-meter.service';
import { PSMProgressBarDirective } from './psm-progress-bar.directive';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
  styleUrls: ['./password-strength-meter.component.less'],
  standalone: true,
  providers: [PasswordStrengthMeterService],
  imports: [PSMProgressBarDirective]
})
export class PasswordStrengthMeterComponent implements OnChanges {
  @Input() password: string | undefined;

  @Input({ transform: numberAttribute }) minPasswordLength = 8;

  @Input({ transform: booleanAttribute }) enableFeedback = false;

  @Input() colors: string[] = [];

  @Input({ transform: numberAttribute }) numberOfProgressBarItems = 5;

  @Output() readonly strengthChange = new EventEmitter<number>();

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
    if (!this.password) {
      this.passwordStrength = null;
      this.feedback = null;
    } else if (this.password && this.password.length < this.minPasswordLength) {
      this.passwordStrength = 0;
      this.feedback = null;
    } else {
      if (this.enableFeedback) {
        const result = this.passwordStrengthMeterService.scoreWithFeedback(this.password);
        this.passwordStrength = result.score;
        this.feedback = result.feedback;
      } else {
        this.passwordStrength = this.passwordStrengthMeterService.score(this.password);
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
