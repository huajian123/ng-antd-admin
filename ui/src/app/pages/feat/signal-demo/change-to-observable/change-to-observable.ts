import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Subject, interval } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

const FRUIT_LIST = ['苹果', '香蕉', '橙子', '葡萄', '草莓', '芒果', '西瓜', '蓝莓'];

@Component({
  selector: 'app-change-to-observable',
  imports: [PageHeaderComponent, NzCardModule, NzGridModule, NzButtonModule, NzWaveModule, NzInputModule, NzTagModule, NzDividerModule, NzDescriptionsModule, NzStatisticModule, FormsModule],
  templateUrl: './change-to-observable.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './change-to-observable.less'
})
export class ChangeToObservable {
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'toSignal / toObservable 互操作',
    breadcrumb: ['首页', '组件', 'RxJS 互操作'],
    desc: '演示 Signal 与 RxJS Observable 之间的双向桥接，以及 takeUntilDestroyed 订阅管理'
  };

  private readonly destroyRef = inject(DestroyRef);

  // Card 1: toSignal from Subject with debounce (mirrors icon-sel.component.ts)
  private readonly searchInput$ = new Subject<string>();
  readonly debouncedSearch = toSignal(this.searchInput$.pipe(debounceTime(300), distinctUntilChanged()), { initialValue: '' });
  onSearchInput(e: Event): void {
    this.searchInput$.next((e.target as HTMLInputElement).value);
  }

  // Card 2: toSignal from interval (live timer)
  readonly tick = toSignal(interval(1000).pipe(map(n => n + 1)), { initialValue: 0 });
  readonly tickFormatted = computed(() => {
    const t = this.tick();
    const m = Math.floor(t / 60)
      .toString()
      .padStart(2, '0');
    const s = (t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  });

  // Card 3: toObservable from signal → filter list
  readonly filterText = signal('');
  readonly filteredFruits = toSignal(
    toObservable(this.filterText).pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(text => FRUIT_LIST.filter(f => f.includes(text)))
    ),
    { initialValue: FRUIT_LIST }
  );
  onFilterInput(e: Event): void {
    this.filterText.set((e.target as HTMLInputElement).value);
  }

  // Card 4: takeUntilDestroyed subscription management
  readonly subLog = signal<string[]>([]);
  private readonly counter$ = interval(2000).pipe(map(n => `事件 #${n + 1} — ${new Date().toLocaleTimeString()}`));
  private readonly sub = this.counter$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(msg => this.subLog.update(l => [msg, ...l].slice(0, 5)));
  clearSubLog(): void {
    this.subLog.set([]);
  }
}

