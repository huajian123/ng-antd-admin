import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

import { DeptTreeSearchService } from '@app/pages/system/account/dept-tree/dept-tree-search.service';
import { DeptTreeService, FlatNode } from '@app/pages/system/account/dept-tree/dept-tree.service';

@Component({
  selector: 'app-dept-tree',
  templateUrl: './dept-tree.component.html',
  styleUrls: ['./dept-tree.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DeptTreeService, DeptTreeSearchService]
})
export class DeptTreeComponent implements OnInit {
  selectListSelection: SelectionModel<FlatNode>;
  treeControl: FlatTreeControl<FlatNode>;
  @Output() readonly deptIdEven = new EventEmitter<number>();

  constructor(public deptTreeService: DeptTreeService, public deptTreeSearchService: DeptTreeSearchService) {
    this.selectListSelection = this.deptTreeService.selectListSelection;
    this.treeControl = this.deptTreeService.treeControl;
  }

  changeSearch(event: string): void {
    this.deptTreeSearchService.searchValue$.next(event);
  }

  clickNode(node: FlatNode): void {
    this.deptTreeService.clickNode(node);
    this.deptIdEven.emit(node.id);
  }

  resetTree(): void {
    this.deptTreeService.resetTree();
  }

  ngOnInit(): void {
    this.deptTreeService.initDate();
  }
}
