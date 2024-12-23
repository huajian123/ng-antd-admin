import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
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
  // TODO: Skipped for migration because:
  //  Your application code writes to the input. This prevents migration.
  @Input() stepDirection: 'horizontal' | 'vertical' = 'horizontal';
  @Output() readonly next = new EventEmitter<NzSafeAny>();
}
