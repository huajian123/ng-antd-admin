import { ChangeDetectionStrategy, Component, computed, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

interface Category {
  id: number;
  name: string;
  defaultItem: string;
}

@Component({
  selector: 'app-linked-signal-demo',
  imports: [PageHeaderComponent, NzCardModule, NzGridModule, NzButtonModule, NzWaveModule, NzSelectModule, NzTagModule, NzDividerModule, NzDescriptionsModule, NzInputNumberModule, FormsModule],
  templateUrl: './linked-signal-demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './linked-signal-demo.less'
})
export class LinkedSignalDemo {
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'linkedSignal 演示',
    breadcrumb: ['首页', '组件', 'linkedSignal'],
    desc: '演示 linkedSignal() 的派生可写状态用法，source 变化时自动重置，也可手动覆盖'
  };

  // Card 1: basic linkedSignal
  readonly categories: Category[] = [
    { id: 1, name: '水果', defaultItem: '苹果' },
    { id: 2, name: '蔬菜', defaultItem: '胡萝卜' },
    { id: 3, name: '饮料', defaultItem: '绿茶' }
  ];
  readonly selectedCategory = signal<Category>(this.categories[0]);
  readonly selectedItem = linkedSignal(() => this.selectedCategory().defaultItem);
  overrideItem(): void {
    this.selectedItem.set('自定义选项');
  }

  // Card 2: linkedSignal with computation (index reset)
  readonly allLists = {
    fruits: ['苹果', '香蕉', '橙子', '葡萄', '草莓'],
    vegs: ['胡萝卜', '西兰花', '菠菜', '番茄'],
    drinks: ['绿茶', '咖啡', '橙汁']
  };
  readonly currentListKey = signal<keyof typeof this.allLists>('fruits');
  readonly currentList = computed(() => this.allLists[this.currentListKey()]);
  readonly selectedIndex = linkedSignal({
    source: this.currentList,
    computation: () => 0
  });
  get selectedListItem(): string {
    return this.currentList()[this.selectedIndex()] ?? '—';
  }

  // Card 3: computed vs linkedSignal comparison
  readonly baseValue = signal(10);
  readonly computedDouble = computed(() => this.baseValue() * 2);
  readonly linkedDouble = linkedSignal(() => this.baseValue() * 2);
  overrideLinked(): void {
    this.linkedDouble.set(999);
  }
  resetBase(): void {
    this.baseValue.update(v => v + 1);
  }

  // Card 4: table config pattern (mirrors ant-table.component.ts)
  readonly parentConfig = signal({ pageSize: 10, pageIndex: 1, total: 100 });
  readonly localConfig = linkedSignal(() => this.parentConfig());
  changeLocalPage(): void {
    this.localConfig.update(c => ({ ...c, pageIndex: c.pageIndex + 1 }));
  }
  resetFromParent(): void {
    this.parentConfig.update(c => ({ ...c, pageIndex: 1 }));
  }
}

