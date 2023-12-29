import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';

import { AntTableConfig, SortFile, TableHeader } from '@shared/components/ant-table/ant-table.component';
import { fnGetFlattenTreeDataByMap, fnTreeDataToMap } from '@utils/treeTableTools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzResizeEvent, NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzTableQueryParams, NzTableSize, NzTableModule } from 'ng-zorro-antd/table';

import { MapPipe } from '../../pipes/map.pipe';
import { TableFiledPipe } from '../../pipes/table-filed.pipe';

export interface TreeNodeInterface {
  id: string | number;
  level?: number;
  expand?: boolean;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;

  [key: string]: any;
}

export abstract class AntTreeTableComponentToken {
  tableSize!: NzTableSize;
  tableConfig!: AntTableConfig;

  abstract tableChangeDectction(): void;
}

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.less'],
  providers: [{ provide: AntTreeTableComponentToken, useExisting: TreeTableComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzTableModule, NzResizableModule, NgClass, NgTemplateOutlet, MapPipe, TableFiledPipe]
})
export class TreeTableComponent implements OnChanges {
  _dataList!: TreeNodeInterface[];
  allChecked: boolean = false;
  indeterminate = false;
  // 从业务组件中传入的缓存的已经选中的checkbox数据数组,相当于缓存的tableData
  @Input() cashArray: NzSafeAny[] = [];
  checkedCashArrayFromComment: NzSafeAny[] = [];
  @Output() readonly sortFn: EventEmitter<SortFile> = new EventEmitter<SortFile>();
  @Output() readonly changePageNum = new EventEmitter<NzTableQueryParams>();
  @Output() readonly changePageSize = new EventEmitter<number>();
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};
  @Input({ required: true }) tableConfig!: AntTableConfig;
  @Output() readonly selectedChange: EventEmitter<NzSafeAny[]> = new EventEmitter<NzSafeAny[]>();
  cashExpandIdArray: Array<number | string> = []; // 缓存已经展开的节点的id

  @Input()
  set tableData(value: TreeNodeInterface[]) {
    this._dataList = value;
    // 根据dataList获取map形式的treeData,每一个key对应一组（也就是有子集）的数据
    this.mapOfExpandedData = fnTreeDataToMap(this._dataList);
    const beFilterId: Array<string | number> = []; // 待删除的展开数据的child集的id数组
    Object.values(this.mapOfExpandedData).forEach(menuArray => {
      menuArray.forEach(menuItem => {
        if (this.cashExpandIdArray.includes(menuItem.id)) {
          menuItem.expand = true;
          // 让当前节点子集进行缓存，下面再删除，不然会多余出子集的数据到expand为true的平级上
          if (menuItem.children && menuItem.children.length > 0) {
            menuItem.children.forEach(item => {
              beFilterId.push(item.id);
            });
          }
        }
      });
    });
    beFilterId.forEach(item => {
      delete this.mapOfExpandedData[item];
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

  constructor(private cdr: ChangeDetectorRef) {}

  tableChangeDectction(): void {
    // 改变引用触发变更检测。
    this._dataList = [...this._dataList];
    this.cdr.markForCheck();
  }

  // 表头拖动
  onResize(nzResizeEvent: NzResizeEvent, col: string): void {
    this.tableConfig.headers = this.tableConfig.headers.map(e =>
      e.title === col
        ? {
            ...e,
            width: +`${nzResizeEvent.width}`
          }
        : e
    ) as TableHeader[];
  }

  // 点击排序
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

  // 分页页码改变
  onQueryParamsChange(tableQueryParams: NzTableQueryParams): void {
    this.changePageNum.emit(tableQueryParams);
  }

  // 修改一页几条的页码
  onPageSizeChange($event: NzSafeAny): void {
    this.changePageSize.emit($event);
  }

  changecashExpandIdArray(id: number | string, expand: boolean): void {
    const index = this.cashExpandIdArray.indexOf(id);
    if (expand) {
      if (index === -1) {
        this.cashExpandIdArray.push(id);
      }
    } else {
      if (index !== -1) {
        this.cashExpandIdArray.splice(index, 1);
      }
    }
  }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    this.changecashExpandIdArray(data.id, $event);
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

  // 设置选中与否，并处理缓存值
  setIsCheckFn(dataItem: NzSafeAny, isChecked: boolean): void {
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

  // 全选
  onAllChecked(isChecked: boolean): void {
    fnGetFlattenTreeDataByMap(this.mapOfExpandedData).forEach(row => {
      this.setIsCheckFn(row, isChecked);
    });
    this.selectedChange.emit(this.checkedCashArrayFromComment);
    this.refreshStatus();
  }

  // 单选
  public checkRowSingle(isChecked: boolean, selectIndex: number, row: TreeNodeInterface): void {
    this.setIsCheckFn(row, isChecked);
    this.selectedChange.emit(this.checkedCashArrayFromComment);
    this.refreshStatus();
  }

  // 刷新复选框状态
  refreshStatus(): void {
    // 获取铺平的treeData
    const dataTempArray: TreeNodeInterface[] = fnGetFlattenTreeDataByMap(this.mapOfExpandedData);

    const allChecked =
      dataTempArray.length > 0 &&
      dataTempArray.every(item => {
        return item['_checked'] === true;
      });
    const allUnChecked = dataTempArray.length > 0 && dataTempArray.every(item => item['_checked'] !== true);
    this.allChecked = allChecked;
    this.indeterminate = !allChecked && !allUnChecked;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cashArray'] && !changes['cashArray'].firstChange) {
      this.checkedCashArrayFromComment = [...changes['cashArray'].currentValue];
      fnGetFlattenTreeDataByMap(this.mapOfExpandedData).forEach(row => {
        // 判断缓存中是否有该值，有的话设置成true
        const index = this.checkedCashArrayFromComment.findIndex(item => item.id === row.id);
        this.setIsCheckFn(row, index !== -1);
      });
      this.refreshStatus();
    }
  }
}
