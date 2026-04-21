import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';

export type PortalStep = 'A' | 'B' | 'C';

@Component({
  selector: 'app-portal-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzCardModule, NzButtonModule, NzTagModule],
  template: `
    <div class="text-center p-24">
      <div class="sp-32 m-b-8">{{ icon() }}</div>
      <div class="m-b-8" style="font-size: 18px; font-weight: 600">{{ title() }}</div>
      <p class="sp-12 m-b-20" style="color: #8c8c8c">{{ desc() }}</p>
      <nz-tag [nzColor]="color()">步骤 {{ step() }}</nz-tag>
      <div class="center m-t-20 g-8">
        @if (step() !== 'A') {
          <button nz-button (click)="prev.emit()">上一步</button>
        }
        @if (step() !== 'C') {
          <button nz-button nzType="primary" (click)="next.emit()">下一步</button>
        } @else {
          <button nz-button nzType="primary" (click)="next.emit()">重新开始</button>
        }
      </div>
    </div>
  `
})
export class PortalCard {
  readonly step = input<PortalStep>('A');
  readonly title = input('');
  readonly desc = input('');
  readonly icon = input('');
  readonly color = input('blue');
  readonly next = output<void>();
  readonly prev = output<void>();
}
