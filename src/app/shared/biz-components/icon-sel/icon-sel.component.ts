import { NgStyle } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter, AfterViewInit, inject, DestroyRef, booleanAttribute } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  standalone: true,
  imports: [NzIconModule, NzButtonModule, NzPopoverModule, NzInputModule, NzCardModule, NgStyle, NzEmptyModule, NzPaginationModule]
})
export class IconSelComponent implements OnInit, AfterViewInit {
  @Input({ transform: booleanAttribute }) visible = false;
  // 做图标搜索防抖
  private searchText$ = new Subject<string>();
  selectedIcon = '';
  @Output() readonly selIcon = new EventEmitter<string>();
  // 分页信息
  pageObj = {
    pageSize: 50,
    pageNum: 1
  };
  // 图标搜索出来的所有结果
  iconsStrAllArray: IconItem[] = [];
  sourceIconsArray: IconItem[] = []; // 所有icon的数据源
  iconsStrShowArray: IconItem[] = []; // 每页中展示的icon
  gridStyle = {
    width: '20%'
  };
  destroyRef = inject(DestroyRef);

  private cdr = inject(ChangeDetectorRef);

  constructor() {
    zorroIcons.forEach(item => {
      this.sourceIconsArray.push({ icon: fnKebabCase(item), isChecked: false });
    });
    this.iconsStrAllArray = JSON.parse(JSON.stringify(this.sourceIconsArray));
  }

  searchIcon(e: Event): void {
    this.searchText$.next((e.target as HTMLInputElement).value);
  }

  selIconFn(item: IconItem): void {
    this.selectedIcon = item.icon;
    [this.sourceIconsArray, this.iconsStrShowArray, this.iconsStrAllArray].forEach(item => {
      item.forEach(icon => (icon.isChecked = false));
    });
    item.isChecked = true;
    this.selIcon.emit(item.icon);
  }

  pageSizeChange(event: number): void {
    this.pageObj = { ...this.pageObj, pageSize: event };
    this.getData(1);
  }

  // 分页获取数据
  getData(event: number = this.pageObj.pageNum): void {
    this.pageObj = { ...this.pageObj, pageNum: event };
    this.iconsStrShowArray = [...this.iconsStrAllArray.slice((this.pageObj.pageNum - 1) * this.pageObj.pageSize, this.pageObj.pageNum * this.pageObj.pageSize)];
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    this.searchText$.pipe(debounceTime(200), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.iconsStrAllArray = this.sourceIconsArray.filter(item => item.icon.includes(res));
      this.getData();
      this.cdr.markForCheck();
    });
  }
}
