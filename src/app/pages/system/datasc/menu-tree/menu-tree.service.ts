import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SearchCommonVO } from '@core/services/types';
import { MenusService } from '@services/system/menus.service';
import { fnFlatDataHasParentToTree, fnFlattenTreeDataByDataList } from '@utils/treeTableTools';
import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';

interface TreeNode {
  id: number;
  menuName: string;
  disabled?: boolean;
  children?: TreeNode[];
}

export interface FlatNode {
  expandable: boolean;
  menuName: string;
  id: number;
  level: number;
  disabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MenuTreeService {
  TREE_DATA$ = new BehaviorSubject<any[]>([]);
  currentSelNode: FlatNode | null = null;
  private transformer = (node: TreeNode, level: number): FlatNode => ({
    expandable: !!node.children && node.children.length > 0,
    menuName: node.menuName,
    level,
    id: node.id,
    disabled: !!node.disabled
  });

  selectListSelection = new SelectionModel<FlatNode>(false);

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new NzTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource = new NzTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: FlatNode): boolean => node.expandable;

  constructor(private cdr: ChangeDetectorRef,private dataService: MenusService) { }

  resetTree(): void {
    if (this.currentSelNode) {
      this.selectListSelection.deselect(this.currentSelNode);
      this.currentSelNode = null;
      this.cdr.markForCheck();
    }
  }

  clickNode(node: FlatNode): void {
    this.currentSelNode = node;
    this.selectListSelection.select(node);
  }

  initDate(): void {
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0
    };
    this.dataService.getMenuListParams(params).subscribe(menuList => {
      this.TREE_DATA$.next(fnFlatDataHasParentToTree(menuList.list));
    });
  }
}
