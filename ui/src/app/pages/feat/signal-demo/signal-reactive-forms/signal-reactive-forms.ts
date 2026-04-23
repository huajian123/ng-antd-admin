import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

@Component({
  selector: 'app-signal-reactive-forms',
  imports: [
    PageHeaderComponent,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzWaveModule,
    NzInputModule,
    NzFormModule,
    NzTagModule,
    NzDividerModule,
    NzDescriptionsModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    KeyValuePipe
  ],
  templateUrl: './signal-reactive-forms.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './signal-reactive-forms.less'
})
export class SignalReactiveForms {
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Signal + Reactive Forms 集成',
    breadcrumb: ['首页', '功能', 'Signal + Forms'],
    desc: '演示 Signal 与 Reactive Forms 的集成：toSignal() 同步表单值、Signal 驱动验证状态、动态表单字段'
  };

  // Card 1: FormControl value → Signal
  readonly nameControl = new FormControl('', Validators.required);
  readonly nameSignal = toSignal(this.nameControl.valueChanges, { initialValue: '' });
  readonly nameLength = computed(() => (this.nameSignal() ?? '').length);
  readonly isNameValid = computed(() => this.nameControl.valid);

  // Card 2 & 3: UntypedFormGroup allows addControl/removeControl with any key
  readonly form = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required, Validators.minLength(3)]),
    email: new UntypedFormControl('', [Validators.required, Validators.email])
  });

  readonly formStatus = toSignal(this.form.statusChanges, { initialValue: 'INVALID' });
  readonly isValid = computed(() => this.formStatus() === 'VALID');
  readonly controlCount = computed(() => Object.keys(this.form.controls).length);

  // Card 3: Signal-controlled dynamic field
  readonly showExtra = signal(false);

  get showExtraModel(): boolean {
    return this.showExtra();
  }

  set showExtraModel(value: boolean) {
    if (value !== this.showExtra()) {
      this.toggleExtra();
    }
  }

  toggleExtra(): void {
    if (this.showExtra()) {
      this.form.removeControl('extra');
    } else {
      this.form.addControl('extra', new UntypedFormControl('', Validators.required));
    }
    this.showExtra.update(v => !v);
  }

  // Card 4: submit result stored in Signal
  readonly submitResult = signal<Record<string, unknown> | null>(null);
  submit(): void {
    if (this.form.valid) {
      this.submitResult.set(this.form.value as Record<string, unknown>);
    }
  }
  resetForm(): void {
    this.form.reset();
    this.submitResult.set(null);
  }
}

