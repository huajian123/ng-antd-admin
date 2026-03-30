import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

@Component({
  selector: 'app-demo-stagger',
  templateUrl: './demo-stagger.component.html',
  styleUrl: './demo-stagger.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzWaveModule]
})
export class DemoStaggerComponent {
  items = signal<number[]>([]);
  listKey = signal(0);

  readonly colors = ['#1890ff', '#52c41a', '#722ed1', '#fa8c16', '#eb2f96', '#13c2c2'];

  play(): void {
    this.items.set([]);
    this.listKey.update(v => v + 1);
    setTimeout(() => {
      this.items.set([0, 1, 2, 3, 4, 5]);
    }, 0);
  }
}
