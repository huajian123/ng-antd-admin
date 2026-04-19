
import { Component, ChangeDetectionStrategy, booleanAttribute, output, input, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { zorroIcons } from '@shared/biz-components/icon-sel/zorro-icons';
import { fnKebabCase } from '@utils/camelFn';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

interface IconItem {
  icon: string;
  isChecked: boolean;
}

@Component({
  selector: 'app-icon-sel',
  templateUrl: './icon-sel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzIconModule, NzButtonModule, NzPopoverModule, NzInputModule, NzCardModule, NzEmptyModule, NzPaginationModule]
})
export class IconSelComponent {
  visible = input(false, { transform: booleanAttribute });
  readonly selIcon = output<string>();
  // 做图标搜索防抖
  private readonly searchText$ = new Subject<string>();
  private readonly searchText = toSignal(this.searchText$.pipe(debounceTime(200), distinctUntilChanged()), { initialValue: '' });

  // 所有icon的数据源
  private readonly sourceIconsArray: IconItem[] = zorroIcons.map(item => ({ icon: fnKebabCase(item), isChecked: false }));

  // 图标搜索出来的所有结果
  readonly iconsStrAllArray = computed<IconItem[]>(() => {
    const keyword = this.searchText();
    if (!keyword) {
      return this.sourceIconsArray;
    }
    return this.sourceIconsArray.filter(item => item.icon.includes(keyword));
  });

  // 分页信息
  readonly pageObj = signal({ pageSize: 50, pageIndex: 1 });

  // 每页中展示的icon
  readonly iconsStrShowArray = computed<IconItem[]>(() => {
    const { pageIndex, pageSize } = this.pageObj();
    return this.iconsStrAllArray().slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
  });

  readonly gridStyle = { width: '20%' };
  selectedIcon = '';

  searchIcon(e: Event): void {
    this.pageObj.update(v => ({ ...v, pageIndex: 1 }));
    this.searchText$.next((e.target as HTMLInputElement).value);
  }

  selIconFn(item: IconItem): void {
    this.selectedIcon = item.icon;
    this.sourceIconsArray.forEach(icon => (icon.isChecked = false));
    item.isChecked = true;
    this.selIcon.emit(item.icon);
  }

  pageSizeChange(event: number): void {
    this.pageObj.update(v => ({ ...v, pageSize: event, pageIndex: 1 }));
  }

  pageIndexChange(pageIndex: number): void {
    this.pageObj.update(v => ({ ...v, pageIndex }));
  }
}
