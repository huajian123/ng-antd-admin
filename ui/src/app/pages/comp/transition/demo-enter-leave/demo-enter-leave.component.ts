import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

@Component({
  selector: 'app-demo-enter-leave',
  templateUrl: './demo-enter-leave.component.html',
  styleUrl: './demo-enter-leave.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzWaveModule]
})
export class DemoEnterLeaveComponent {
  showFade = signal(true);
  showSlide = signal(true);
  showZoom = signal(true);

  toggleFade(): void {
    this.showFade.update(v => !v);
  }

  toggleSlide(): void {
    this.showSlide.update(v => !v);
  }

  toggleZoom(): void {
    this.showZoom.update(v => !v);
  }
}
