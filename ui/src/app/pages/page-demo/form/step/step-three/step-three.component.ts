import { Component, ChangeDetectionStrategy, input, output, InputSignal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzResultModule, NzButtonModule, NzWaveModule, NzDescriptionsModule]
})
export class StepThreeComponent {
  stepDirection: InputSignal<'horizontal' | 'vertical'> = input<'horizontal' | 'vertical'>('horizontal');
  readonly next = output<void>();
}
