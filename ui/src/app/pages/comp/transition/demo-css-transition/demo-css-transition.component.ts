import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

@Component({
  selector: 'app-demo-css-transition',
  templateUrl: './demo-css-transition.component.html',
  styleUrl: './demo-css-transition.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzWaveModule]
})
export class DemoCssTransitionComponent {
  expanded = signal(false);
  highlighted = signal(false);
  moved = signal(false);

  toggle(type: 'expand' | 'highlight' | 'move'): void {
    if (type === 'expand') this.expanded.update(v => !v);
    if (type === 'highlight') this.highlighted.update(v => !v);
    if (type === 'move') this.moved.update(v => !v);
  }
}
