import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { DestroyService } from '@core/services/common/destory.service';
import { zorroIcons } from '@shared/biz-components/icon-sel/zorro-icons';
import { fnKebabCase } from '@utils/camelFn';

interface IconItem {
  icon: string;
  isChecked: boolean;
}

@Component({
  selector: 'app-icon-sel',
  templateUrl: './icon-sel.component.html',
  styleUrls: ['./icon-sel.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class IconSelComponent implements OnInit, AfterViewInit {
  @Input() visible = false;
  // 做图标搜索防抖
  private searchText$ = new Subject<string>();
  seletedIcon = '';
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

  constructor(private cdr: ChangeDetectorRef, private destroy$: DestroyService) {
    zorroIcons.forEach(item => {
      this.sourceIconsArray.push({ icon: fnKebabCase(item), isChecked: false });
    });
    this.iconsStrAllArray = JSON.parse(JSON.stringify(this.sourceIconsArray));
  }

  searchIcon(e: Event): void {
    this.searchText$.next((e.target as HTMLInputElement).value);
  }

  selIconFn(item: IconItem): void {
    this.seletedIcon = item.icon;
    this.sourceIconsArray.forEach(icon => (icon.isChecked = false));
    this.iconsStrShowArray.forEach(icon => (icon.isChecked = false));
    this.iconsStrAllArray.forEach(icon => (icon.isChecked = false));

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
    this.searchText$.pipe(debounceTime(200), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(res => {
      this.iconsStrAllArray = this.sourceIconsArray.filter(item => item.icon.includes(res));
      this.getData();
      this.cdr.markForCheck();
    });
  }
}
