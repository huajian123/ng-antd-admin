import { ChangeDetectionStrategy, Component, computed, signal, untracked } from '@angular/core';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

interface ListItem {
  id: number;
  name: string;
  renderCount: number;
}
@Component({
  selector: 'app-performance-optimization',
  imports: [PageHeaderComponent, NzCardModule, NzGridModule, NzButtonModule, NzWaveModule, NzTagModule, NzDividerModule, NzDescriptionsModule],
  templateUrl: './performance-optimization.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './performance-optimization.less'
})
export class PerformanceOptimization {
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Signal 性能优化',
    breadcrumb: ['首页', '功能', 'Signal 性能优化'],
    desc: '演示 trackBy、computed() 缓存、OnPush 变更检测、untracked() 的性能优化技巧'
  };

  // Card 1: trackBy
  readonly items = signal<ListItem[]>(Array.from({ length: 8 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}`, renderCount: 0 })));
  trackById = (_: number, item: ListItem) => item.id;
  shuffleItems(): void {
    this.items.update(arr => [...arr].sort(() => Math.random() - 0.5));
  }
  addItem(): void {
    this.items.update(arr => {
      const nextId = Math.max(...arr.map(i => i.id)) + 1;
      return [...arr, { id: nextId, name: `Item ${nextId}`, renderCount: 0 }];
    });
  }

  // Card 2: computed() caching
  private computeCallCount = 0;
  readonly bigList = signal(Array.from({ length: 10000 }, (_, i) => i + 1));
  readonly expensiveSum = computed(() => {
    this.computeCallCount++;
    return this.bigList().reduce((a, b) => a + b, 0);
  });
  readonly actualComputeCount = signal(0);
  readSumTenTimes(): void {
    for (let i = 0; i < 10; i++) this.expensiveSum();
    this.actualComputeCount.set(this.computeCallCount);
  }
  triggerRecompute(): void {
    this.bigList.update(l => [...l, l.length + 1]);
    this.actualComputeCount.set(this.computeCallCount);
  }

  // Card 3: OnPush + signal vs plain property
  readonly signalValue = signal('初始值');
  plainValue = '初始值';
  updateSignal(): void {
    this.signalValue.set(`更新于 ${new Date().toLocaleTimeString()}`);
  }
  updatePlain(): void {
    this.plainValue = `更新于 ${new Date().toLocaleTimeString()}`;
    // OnPush 下视图不会更新，因为没有 signal 变化
  }

  // Card 4: untracked()
  readonly a = signal(1);
  readonly b = signal(100);
  private withTrackingCount = 0;
  private withUntrackedCount = 0;
  readonly withTracking = computed(() => {
    this.withTrackingCount++;
    return this.a() + this.b();
  });
  readonly withUntracked = computed(() => {
    this.withUntrackedCount++;
    return this.a() + untracked(() => this.b());
  });
  readonly trackingCallCount = signal(0);
  readonly untrackedCallCount = signal(0);
  incrementB(): void {
    this.b.update(v => v + 1);
    this.trackingCallCount.set(this.withTrackingCount);
    this.untrackedCallCount.set(this.withUntrackedCount);
    // force read to trigger recompute
    this.withTracking();
    this.withUntracked();
    this.trackingCallCount.set(this.withTrackingCount);
    this.untrackedCallCount.set(this.withUntrackedCount);
  }
  incrementA(): void {
    this.a.update(v => v + 1);
    this.withTracking();
    this.withUntracked();
    this.trackingCallCount.set(this.withTrackingCount);
    this.untrackedCallCount.set(this.withUntrackedCount);
  }
}

