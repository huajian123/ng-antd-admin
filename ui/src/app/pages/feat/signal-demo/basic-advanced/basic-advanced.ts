import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

@Component({
  selector: 'app-basic-advanced',
  imports: [PageHeaderComponent, NzCardModule, NzGridModule, NzButtonModule, NzWaveModule, NzTagModule, NzDividerModule, NzInputNumberModule, NzDescriptionsModule, FormsModule],
  templateUrl: './basic-advanced.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './basic-advanced.less'
})
export class BasicAdvanced {
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Signal 基础与进阶',
    breadcrumb: ['首页', '组件', 'Signal 基础'],
    desc: '演示 signal()、computed()、effect() 的核心用法，以及自定义相等函数'
  };

  // Card 1: signal read/write/update
  readonly count = signal(0);
  increment(): void {
    this.count.update(v => v + 1);
  }
  decrement(): void {
    this.count.update(v => v - 1);
  }
  reset(): void {
    this.count.set(0);
  }

  // Card 2: computed
  readonly numA = signal(3);
  readonly numB = signal(4);
  readonly sum = computed(() => this.numA() + this.numB());
  readonly product = computed(() => this.numA() * this.numB());
  readonly isEven = computed(() => this.sum() % 2 === 0);

  // Card 3: effect log panel
  readonly effectColor = signal('#1890ff');
  readonly effectLog = signal<string[]>([]);
  private readonly colorEffect = effect(() => {
    const color = this.effectColor();
    this.effectLog.update(log => [`[${new Date().toLocaleTimeString()}] color → ${color}`, ...log].slice(0, 8));
  });
  clearLog(): void {
    this.effectLog.set([]);
  }

  // Card 4: signal with equal option
  readonly profile = signal({ name: '张三', age: 25 }, { equal: (a, b) => a.name === b.name && a.age === b.age });
  readonly updateCount = signal(0);
  setProfileSame(): void {
    this.profile.set({ name: '张三', age: 25 }); // equal → no update
  }
  setProfileDiff(): void {
    this.profile.update(p => ({ ...p, age: p.age + 1 }));
    this.updateCount.update(v => v + 1);
  }
}

