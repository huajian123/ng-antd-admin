import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-demo-enter-leave',
  templateUrl: './demo-enter-leave.component.html',
  styleUrl: './demo-enter-leave.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzWaveModule, NzCardModule, NzGridModule, NzTagModule, NzDividerModule]
})
export class DemoEnterLeaveComponent {
  showFade = signal(true);
  showSlide = signal(true);
  showZoom = signal(true);

  toggle(target: 'fade' | 'slide' | 'zoom'): void {
    if (target === 'fade') this.showFade.update(v => !v);
    if (target === 'slide') this.showSlide.update(v => !v);
    if (target === 'zoom') this.showZoom.update(v => !v);
  }
}
