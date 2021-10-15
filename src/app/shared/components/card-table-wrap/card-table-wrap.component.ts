import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {NzTableSize} from "ng-zorro-antd/table";
import {AntTableComponentToken, TableHeader} from "../ant-table/ant-table.component";

interface TableSizeItem {
  sizeName: string,
  selected: boolean,
  value: NzTableSize,
}


@Component({
  selector: 'app-card-table-wrap',
  templateUrl: './card-table-wrap.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardTableWrapComponent implements OnInit, AfterContentInit {
  @Input() btnTpl: TemplateRef<any> | undefined;
  @Output() reload = new EventEmitter<any>();
  @ContentChild(AntTableComponentToken) antTableComponent!: AntTableComponentToken;
  tableConfigVisible = false;
  tableSizeOptions: TableSizeItem[] = [
    {sizeName: '默认', selected: true, value: "default"},
    {sizeName: '中等', selected: false, value: "middle"},
    {sizeName: '紧凑', selected: false, value: "small"},
  ];
  tableHeaders: TableHeader[] = [];

  constructor() {
  }

  tableSizeMenuClick(item: TableSizeItem): void {
    this.tableSizeOptions.forEach(tableSizeItem => tableSizeItem.selected = false);
    item.selected = true;
    this.antTableComponent.tableSize = item.value;
  }

  changeTableConfigShow(): void {
    const tempArray = [...this.tableHeaders];
    const fixedLeftArray: TableHeader[] = [];
    const fixedRightArray: TableHeader[] = [];
    const noFixedArray: TableHeader[] = [];
    tempArray.forEach(item => {
      if (item.fixed) {
        if (item.fixedDir === "left") {
          fixedLeftArray.push(item);
        } else {
          fixedRightArray.push(item)
        }
      } else {
        noFixedArray.push(item)
      }
    });
    this.antTableComponent.tableConfig.headers = [...fixedLeftArray, ...noFixedArray, ...fixedRightArray];
    this.antTableComponent.tableChangeDectction();
  }

  dropTableConfig(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tableHeaders, event.previousIndex, event.currentIndex);
    this.changeTableConfigShow();
  }

  fixedTableHead(dir: 'right' | 'left', item: TableHeader): void {
    item.fixed = !(item.fixed && item.fixedDir === dir);
    item.fixedDir = dir;
    this.changeTableConfigShow();
  }

  reloadClick(): void {
    this.reload.emit();
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.tableHeaders = [...this.antTableComponent.tableConfig.headers];
    this.tableHeaders.forEach(item => item.show = true);
  }

}
