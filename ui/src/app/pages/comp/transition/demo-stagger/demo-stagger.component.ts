import { Component, ChangeDetectionStrategy, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface StaggerItem {
  label: string;
  color: string;
}

@Component({
  selector: 'app-demo-stagger',
  templateUrl: './demo-stagger.component.html',
  styleUrl: './demo-stagger.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzWaveModule, NzCardModule, NzGridModule, NzTagModule, NzDividerModule]
})
export class DemoStaggerComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly cardItems: StaggerItem[] = [
    { label: '设计', color: '#1890ff' },
    { label: '开发', color: '#52c41a' },
    { label: '测试', color: '#fa8c16' },
    { label: '部署', color: '#722ed1' },
    { label: '监控', color: '#eb2f96' },
    { label: '迭代', color: '#13c2c2' }
  ];

  readonly listItems: StaggerItem[] = [
    { label: '第一条数据加载完成', color: '#1890ff' },
    { label: '第二条数据加载完成', color: '#52c41a' },
    { label: '第三条数据加载完成', color: '#fa8c16' },
    { label: '第四条数据加载完成', color: '#722ed1' },
    { label: '第五条数据加载完成', color: '#eb2f96' }
  ];

  visibleCards = signal<StaggerItem[]>([]);
  visibleList = signal<StaggerItem[]>([]);

  playCards(): void {
    this.visibleCards.set([]);
    timer(50).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.visibleCards.set(this.cardItems);
    });
  }

  playList(): void {
    this.visibleList.set([]);
    timer(50).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.visibleList.set(this.listItems);
    });
  }
}
