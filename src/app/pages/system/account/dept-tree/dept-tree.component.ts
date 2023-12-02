import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DeptTreeSearchService } from '@app/pages/system/account/dept-tree/dept-tree-search.service';
import { DeptTreeService, FlatNode } from '@app/pages/system/account/dept-tree/dept-tree.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';

@Component({
  selector: 'app-dept-tree',
  templateUrl: './dept-tree.component.html',
  styleUrls: ['./dept-tree.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DeptTreeService, DeptTreeSearchService],
  standalone: true,
  imports: [NzCardModule, NzButtonModule, NzInputModule, FormsModule, NzIconModule, NzTreeViewModule, NzHighlightModule]
})
export class DeptTreeComponent implements OnInit {
  selectListSelection: SelectionModel<FlatNode>;
  treeControl: FlatTreeControl<FlatNode>;
  @Output() readonly deptIdEven = new EventEmitter<number>();

  deptTreeService = inject(DeptTreeService);
  deptTreeSearchService = inject(DeptTreeSearchService);

  constructor() {
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
