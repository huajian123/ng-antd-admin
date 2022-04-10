import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, takeUntil} from "rxjs/operators";
import {DestroyService} from "@core/services/common/destory.service";

interface IconItem {
  icon: string;
  isChecked: boolean;
}

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class IconsComponent implements OnInit, AfterViewInit {
  @ViewChild("searchInput", {static: true}) searchInput!: ElementRef<HTMLInputElement>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '图标',
    breadcrumb: ['首页', '功能', '图标'],
    desc: '在图标选择器中演示：搜索防抖，前端分页功能。'
  };
  // 做图标搜索防抖
  private searchText$ = new Subject<string>();
  seletedIcon = '';
  // 分页信息
  pageObj = {
    pageSize: 20,
    pageNum: 1
  };
  // 图标搜索出来的所有结果
  iconsStrAllArray: IconItem[] = [
    {icon: 'wechat', isChecked: false},
    {icon: 'android', isChecked: false},
    {icon: 'apple', isChecked: false},
    {icon: 'windows', isChecked: false},
    {icon: 'ie', isChecked: false},
    {icon: 'github', isChecked: false},
    {icon: 'chrome', isChecked: false},
  ];
  sourceIconsArray: IconItem[] = [];// 所有icon的数据源
  iconsStrShowArray: IconItem[] = []; // 每页中展示的icon
  gridStyle = {
    width: '10%',
  };

  constructor(private cdr: ChangeDetectorRef, private destroy$: DestroyService) {
    for (let i = 0; i < 4; i++) {
      // 造数据
      this.iconsStrAllArray = [...this.iconsStrAllArray, ...this.iconsStrAllArray]
    }
    // 这里就是最后加两个不同的数据，好区分，没有什么特殊意义
    this.iconsStrAllArray.push({icon: 'qq', isChecked: false}, {icon: 'zhihu', isChecked: false})
    this.iconsStrAllArray = JSON.parse(JSON.stringify(this.iconsStrAllArray));
    this.sourceIconsArray = JSON.parse(JSON.stringify(this.iconsStrAllArray));
  }

  searchIcon(e: Event): void {
    this.searchText$.next((e.target as HTMLInputElement).value);
  }

  selIconFn(item: IconItem): void {
    this.seletedIcon = item.icon;
    this.sourceIconsArray.forEach(icon => icon.isChecked = false);
    this.iconsStrShowArray.forEach(icon => icon.isChecked = false);
    item.isChecked = true;
  }

  pageSizeChange(event: number): void {
    this.pageObj = {...this.pageObj, pageSize: event};
    this.getData(1);
  }

  // 分页获取数据
  getData(event: number = this.pageObj.pageNum): void {
    this.pageObj = {...this.pageObj, pageNum: event};
    this.iconsStrShowArray = [...this.iconsStrAllArray.slice((this.pageObj.pageNum - 1) * this.pageObj.pageSize, this.pageObj.pageNum * this.pageObj.pageSize)];
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit(): void {
    this.searchText$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      takeUntil(this.destroy$)).subscribe(res => {
      this.iconsStrAllArray = this.sourceIconsArray.filter(item => item.icon.includes(res));
      this.getData();
      this.cdr.markForCheck();
    })
  }

}
