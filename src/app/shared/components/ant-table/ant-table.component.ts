import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';
import { NzTableQueryParams, NzTableSize } from 'ng-zorro-antd/table';

export interface TableHeader {
  title: string; // 表头名称
  field?: string; // 字段
  pipe?: string; // 管道
  showSort?: boolean; // 是否显示排序
  sortDir?: undefined | 'asc' | 'desc'; // 排序方向
  width?: number; // 单元格宽度
  thTemplate?: TemplateRef<NzSafeAny>; // th单元格模板
  tdTemplate?: TemplateRef<NzSafeAny>; // td单元格模板
  fixed?: boolean; // 是否固定单元格 （只有从最左边或最右边连续固定才有效）
  fixedDir?: 'left' | 'right'; // 固定在左边还是右边，需要配合fixed来使用
  notNeedEllipsis?: boolean; // 不需要...时给true
  tdClassList?: string[]; // 为td单元格指定类 (父组件中的类必须加上 /deep/ 前缀才能对子组件生效)
  thClassList?: string[]; // 为th单元格指定类  (父组件中的类必须加上 /deep/ 前缀才能对子组件生效)
  show?: boolean; // 是否显示列，false:不显示，其他：显示
  tdClassFn?: (data: any, index: number) => string[];
  thClassFn?: (data: any) => string[];
}

export interface AntTableConfig {
  needNoScroll?: boolean; //列表是否需要滚动条
  xScroll?: number; //列表横向滚动条
  yScroll?: number; //列表纵向滚动条
  virtualItemSize?: number; //虚拟滚动时每一列的高度，与 cdk itemSize 相同
  showCheckbox?: boolean; // 如果需要checkBox,则需要showCheckbox=true,并且使用app-ant-table组件时传入 [checkedCashArrayFromComment]="cashArray"，cashArray为业务组件中自己定义的数组，并且需要table中的data都有一个id属性
  pageIndex: number; // 当前页码，（与页面中页码双向绑定）
  pageSize: number; // 每一页显示的数据条数（与页面中pageSize双向绑定）
  total: number; // 数据总量，用于计算分页（应该从后端接口中获得）
  loading: boolean; // 是否显示表格加载中
  headers: TableHeader[]; // 列设置
}

export abstract class AntTableComponentToken {
  tableSize!: NzTableSize;
  tableConfig!: AntTableConfig;

  abstract tableChangeDectction(): void;
}

export interface SortFile {
  fileName: string;
  sortDir: undefined | 'desc' | 'asc';
}

@Component({
  selector: 'app-ant-table',
  templateUrl: './ant-table.component.html',
  styleUrls: ['./ant-table.component.less'],
  providers: [{ provide: AntTableComponentToken, useExisting: AntTableComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AntTableComponent implements OnInit, OnChanges {
  _dataList!: NzSafeAny[];
  _tableConfig!: AntTableConfig;
  _scrollConfig: { x: string; y: string } | {} = {};
  // 从业务组件中传入的缓存的已经选中的checkbox数据数组
  @Input() checkedCashArrayFromComment: NzSafeAny[] = [];

  @Input()
  set tableData(value: NzSafeAny[]) {
    this._dataList = value;
    if (this.tableConfig.showCheckbox) {
      this._dataList.forEach(item => {
        item['_checked'] = false;
      });
    }
  }

  get tableData(): NzSafeAny[] {
    return this._dataList;
  }

  _tableSize: NzTableSize = 'default';
  set tableSize(value: NzTableSize) {
    this._tableSize = value;
    this.tableChangeDectction();
  }

  get tableSize(): NzTableSize {
    return this._tableSize;
  }

  @Input()
  set tableConfig(value: AntTableConfig) {
    this._tableConfig = value;
    this.setScrollConfig(value);
  }

  get tableConfig(): AntTableConfig {
    return this._tableConfig;
  }

  @Output() readonly changePageNum = new EventEmitter<NzTableQueryParams>();
  @Output() readonly changePageSize = new EventEmitter<number>();
  @Output() readonly selectedChange: EventEmitter<NzSafeAny[]> = new EventEmitter<NzSafeAny[]>();
  @Output() readonly sortFn: EventEmitter<SortFile> = new EventEmitter<SortFile>();
  indeterminate: boolean = false;
  allChecked: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  setScrollConfig(value: AntTableConfig): void {
    if (value && !value.needNoScroll) {
      // 默认x：100
      this._scrollConfig = { x: '100px' };
      let tempX = {};
      if (value.xScroll !== undefined) {
        tempX = { x: `${value.xScroll}px` };
      }
      let tempY = {};
      if (value.yScroll !== undefined) {
        tempY = { y: `${value.yScroll}px` };
      }
      this._scrollConfig = { ...this._scrollConfig, ...tempX, ...tempY };
    } else {
      this._scrollConfig = {};
    }
  }

  changeSort(tableHeader: TableHeader): void {
    this.tableConfig.headers.forEach(item => {
      if (item.field !== tableHeader.field) {
        item.sortDir = undefined;
      }
    });
    const sortDicArray: [undefined, 'asc', 'desc'] = [undefined, 'asc', 'desc'];
    const index = sortDicArray.findIndex(item => item === tableHeader.sortDir);
    tableHeader.sortDir = index === sortDicArray.length - 1 ? sortDicArray[0] : sortDicArray[index + 1];
    this.sortFn.emit({ fileName: tableHeader.field!, sortDir: tableHeader.sortDir });
  }

  tableChangeDectction(): void {
    // 改变引用触发变更检测。
    this._dataList = [...this._dataList];
    this.cdr.markForCheck();
  }

  trackById(_: number, data: { id: number }): number {
    return data.id;
  }

  public trackByTableHead(index: number, item: NzSafeAny): NzSafeAny {
    return item;
  }

  public trackByTableBody(index: number, item: NzSafeAny): NzSafeAny {
    return item;
  }

  // 分页页码改变
  onQueryParamsChange(tableQueryParams: NzTableQueryParams): void {
    this.changePageNum.emit(tableQueryParams);
  }

  // 修改一页几条的页码
  onPageSizeChange($event: NzSafeAny): void {
    this.changePageSize.emit($event);
  }

  onResize({ width }: NzResizeEvent, col: string): void {
    this.tableConfig.headers = this.tableConfig.headers.map(e =>
      e.title === col
        ? {
            ...e,
            width: +`${width}`
          }
        : e
    ) as TableHeader[];
  }

  checkFn(dataItem: NzSafeAny, isChecked: boolean): void {
    dataItem['_checked'] = isChecked;
    const index = this.checkedCashArrayFromComment.findIndex(cashItem => cashItem.id === dataItem.id);
    if (isChecked) {
      if (index === -1) {
        this.checkedCashArrayFromComment.push(dataItem);
      }
    } else {
      if (index !== -1) {
        this.checkedCashArrayFromComment.splice(index, 1);
      }
    }
  }

  // 单选
  public checkRowSingle(isChecked: boolean, selectIndex: number): void {
    this.checkFn(this._dataList[selectIndex], isChecked);
    this.selectedChange.emit(this.checkedCashArrayFromComment);
    this.refreshStatus();
  }

  // 全选
  onAllChecked(isChecked: boolean): void {
    this._dataList.forEach(item => {
      this.checkFn(item, isChecked);
    });
    this.selectedChange.emit(this.checkedCashArrayFromComment);
    this.refreshStatus();
  }

  // 刷新复选框状态
  refreshStatus(): void {
    this._dataList.forEach(item => {
      const index = this.checkedCashArrayFromComment.findIndex(cashItem => {
        return item.id === cashItem.id;
      });
      item['_checked'] = index !== -1;
    });
    const allChecked =
      this._dataList.length > 0 &&
      this._dataList.every(item => {
        return item['_checked'] === true;
      });
    const allUnChecked = this._dataList.every(item => item['_checked'] !== true);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkedCashArrayFromComment']) {
      this.refreshStatus();
    }
  }
}
