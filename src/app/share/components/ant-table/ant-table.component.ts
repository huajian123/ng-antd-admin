import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import {NzTableQueryParams} from 'ng-zorro-antd/table';


export interface TableHeader {
  title: string;                   // 表头名称
  field?: string;                   // 字段
  pipe?: string;                    // 管道
  width?: number;                    // 单元格宽度
  thTemplate?: TemplateRef<any>;    // th单元格模板
  tdTemplate?: TemplateRef<any>;    // td单元格模板
  fixed?: boolean;                  // 是否固定单元格 （只有从最左边或最右边连续固定才有效）
  notNeedEllipsis?: boolean;        // 不需要...时给true
  tdClassList?: string[];           // 为td单元格指定类 (父组件中的类必须加上 /deep/ 前缀才能对子组件生效)
  thClassList?: string[];           // 为th单元格指定类  (父组件中的类必须加上 /deep/ 前缀才能对子组件生效)
  show?: boolean;                   // 是否显示列，false:不显示，其他：显示
}

export interface MyTableConfig {
  showCheckbox?: boolean;
  pageIndex: number;                 // 当前页码，（与页面中页码双向绑定）
  pageSize: number;                // 每一页显示的数据条数（与页面中pageSize双向绑定）
  total: number;                   // 数据总量，用于计算分页（应该从后端接口中获得）
  loading: boolean;                 // 是否显示表格加载中
  headers: TableHeader[];            // 列设置
}

@Component({
  selector: 'app-ant-table',
  templateUrl: './ant-table.component.html',
  styleUrls: ['./ant-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AntTableComponent implements OnInit, OnChanges {
  _dataList!: any[];
  // 从业务组件中传入的缓存的已经选中的checkbox数据数组
  @Input() checkedCashArrayFromComment: any[];

  @Input()
  set tableData(value: any[]) {
    this._dataList = value;
    if (this.tableConfig.showCheckbox) {
      this._dataList.forEach((item) => {
        item['_checked'] = false;
      });
    }
  }
  get tableData(): any[]{
    return this._dataList;
  }

  @Input() tableConfig!: MyTableConfig;
  @Output() changePageNum = new EventEmitter<NzTableQueryParams>();
  @Output() changePageSize = new EventEmitter<number>();
  @Output() selectedChange: EventEmitter<any[]>;
  indeterminate: boolean;
  allChecked: boolean;

  constructor(private cdr: ChangeDetectorRef) {
    this.indeterminate = false;
    this.allChecked = false;
    this.selectedChange = new EventEmitter<any[]>();
    this.checkedCashArrayFromComment = [];
  }


  public trackByTableHead(index: number, item: any): any {
    return item;
  }

  public trackByTableBody(index: number, item: any): any {
    return item;
  }

  // 分页页码改变
  onQueryParamsChange(tableQueryParams: NzTableQueryParams): void {
    this.changePageNum.emit(tableQueryParams);
  }

  // 修改一页几条的页码
  onPageSizeChange($event: any): void {
    this.changePageSize.emit($event);
  }


  checkFn(dataItem: any, isChecked: boolean): void {
    dataItem['_checked'] = isChecked;
    const index = this.checkedCashArrayFromComment.findIndex((cashItem) => cashItem.id === dataItem.id);
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
    this._dataList.forEach((item) => {
      this.checkFn(item, isChecked);
    });
    this.selectedChange.emit(this.checkedCashArrayFromComment);
  }

  // 刷新复选框状态
  refreshStatus(): void {
    this._dataList.forEach((item) => {
      const index = this.checkedCashArrayFromComment.findIndex((cashItem) => {
        return item.id === cashItem.id;
      });
      if (index !== -1) {
        item['_checked'] = true;
      }
    });
    const allChecked = this._dataList.length > 0 && this._dataList.every((item) => {
      return item['_checked'] === true;
    });
    const allUnChecked = this._dataList.every(item => item['_checked'] !== true);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkedCashArrayFromComment']) {
      this.refreshStatus();
    }
  }
}
