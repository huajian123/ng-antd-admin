import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef, OnChanges, SimpleChanges
} from '@angular/core';
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {NzTableQueryParams, NzTableSize} from "ng-zorro-antd/table";
import {MyTableConfig, SortFile, TableHeader} from "@shared/components/ant-table/ant-table.component";
import {NzResizeEvent} from "ng-zorro-antd/resizable";

export interface TreeNodeInterface {
  id: string;
  level?: number;
  expand?: boolean;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;

  [key: string]: any;
}

export abstract class AntTreeTableComponentToken {
  tableSize!: NzTableSize;
  tableConfig!: MyTableConfig;

  abstract tableChangeDectction(): void;
}

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.less'],
  providers: [
    {provide: AntTreeTableComponentToken, useExisting: TreeTableComponent}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeTableComponent implements OnInit, OnChanges {
  _dataList!: TreeNodeInterface[];
  allChecked: boolean = false;
  indeterminate = false;
  // 从业务组件中传入的缓存的已经选中的checkbox数据数组
  @Input() checkedCashArrayFromComment: NzSafeAny[] = [];
  @Output() sortFn: EventEmitter<SortFile>;
  @Output() changePageNum = new EventEmitter<NzTableQueryParams>();
  @Output() changePageSize = new EventEmitter<number>();
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};
  @Input() tableConfig!: MyTableConfig;
  @Output() selectedChange: EventEmitter<NzSafeAny[]> = new EventEmitter<NzSafeAny[]>();

  @Input()
  set tableData(value: TreeNodeInterface[]) {
    this._dataList = value;
    this._dataList.forEach(item => {
      this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
    });
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

  constructor(private cdr: ChangeDetectorRef) {
    this.sortFn = new EventEmitter<SortFile>();
  }

  tableChangeDectction(): void {
    // 改变引用触发变更检测。
    this._dataList = [...this._dataList];
    this.cdr.markForCheck();
  }

  onResize(nzResizeEvent: NzResizeEvent, col: string): void {
    this.tableConfig.headers = (this.tableConfig.headers.map(e => (e.title === col ? {
      ...e,
      width: +`${nzResizeEvent.width}`
    } : e))) as TableHeader[];
  }

  changeSort(tableHeader: TableHeader): void {
    this.tableConfig.headers.forEach(item => {
      if (item.field !== tableHeader.field) {
        item.sortDir = undefined;
      }
    })
    const sortDicArray: [undefined, 'asc', 'desc'] = [undefined, 'asc', 'desc'];
    const index = sortDicArray.findIndex((item) => item === tableHeader.sortDir);
    tableHeader.sortDir = (index === sortDicArray.length - 1) ? sortDicArray[0] : sortDicArray[index + 1];
    this.sortFn.emit({fileName: tableHeader.field!, sortDir: tableHeader.sortDir})
  }

  // 分页页码改变
  onQueryParamsChange(tableQueryParams: NzTableQueryParams): void {
    this.changePageNum.emit(tableQueryParams);
  }

  // 修改一页几条的页码
  onPageSizeChange($event: NzSafeAny): void {
    this.changePageSize.emit($event);
  }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({...root, level: 0, expand: false, _checked: false});

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({...node.children[i], level: node.level! + 1, _checked: false, expand: false, parent: node});
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }

  checkFn(dataItem: NzSafeAny, isChecked: boolean): void {
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

  // 全选
  onAllChecked(isChecked: boolean): void {
    this._dataList.forEach(item => {
      this.mapOfExpandedData[item.id].forEach(treeItem => {
        this.checkFn(treeItem, isChecked);
      })
    });
    this.selectedChange.emit(this.checkedCashArrayFromComment);
    this.refreshStatus();
  }

  // 单选
  public checkRowSingle(isChecked: boolean, selectIndex: number, row: TreeNodeInterface): void {
    this.checkFn(row, isChecked);
    this.selectedChange.emit(this.checkedCashArrayFromComment);
    this.refreshStatus();
  }

  // 刷新复选框状态
  refreshStatus(): void {
    const dataTempArray: TreeNodeInterface[] = [];
    Object.values(this.mapOfExpandedData).forEach(item => {
      item.forEach(item_1 => {
        dataTempArray.push(item_1);
      })
    })
    const allChecked = dataTempArray.length > 0 && dataTempArray.every((item) => {
      return item['_checked'] === true;
    });
    const allUnChecked = dataTempArray.every(item => item['_checked'] !== true);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkedCashArrayFromComment']) {
      this.refreshStatus();
    }
  }

  ngOnInit(): void {
  }
}
