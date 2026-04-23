import { ChangeDetectionStrategy, Component, model, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-child-counter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzWaveModule, NzTagModule, NzSwitchModule, FormsModule],
  template: `
    <div class="counter-wrap">
      <div class="count-display">{{ count() }}</div>
      <div class="btn-row">
        <button nz-button (click)="decrement()">－</button>
        <button nz-button nzType="primary" (click)="increment()">＋</button>
      </div>
    </div>
    <div class="switch-row m-t-10">
      <span>model() 双向绑定：</span>
      <nz-switch [(ngModel)]="checked" />
      <nz-tag [nzColor]="checked() ? 'success' : 'default'" class="m-l-8">
        {{ checked() ? '开启' : '关闭' }}
      </nz-tag>
    </div>
  `,
  styles: [`
    .counter-wrap { text-align: center; }
    .count-display { font-size: 36px; font-weight: 700; color: #1890ff; margin-bottom: 8px; }
    .btn-row { display: flex; gap: 8px; justify-content: center; }
    .switch-row { display: flex; align-items: center; gap: 8px; }
  `]
})
export class ChildCounterComponent {
  readonly count = signal(0);
  readonly countChange = output<number>();
  readonly checked = model(false);

  increment(): void {
    this.count.update(v => v + 1);
    this.countChange.emit(this.count());
  }

  decrement(): void {
    this.count.update(v => v - 1);
    this.countChange.emit(this.count());
  }
}
