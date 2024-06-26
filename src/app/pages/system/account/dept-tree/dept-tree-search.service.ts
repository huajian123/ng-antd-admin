import { inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { DeptTreeService, FlatNode } from '@app/pages/system/account/dept-tree/dept-tree.service';
import { FilteredTreeResult, TreeNode } from '@app/pages/system/account/dept-tree/filtered-tree-result';

@Injectable()
export class DeptTreeSearchService {
  private deptTreeService = inject(DeptTreeService);

  expandedNodes: FlatNode[] = [];
  searchValue = '';
  originData$ = this.deptTreeService.TREE_DATA$;
  searchValue$ = new BehaviorSubject<string>('');

  filteredData$ = combineLatest([
    this.originData$,
    this.searchValue$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(value => (this.searchValue = value))
    )
  ]).pipe(map(([data, value]) => (value ? this.filterTreeData(data as TreeNode[], value) : new FilteredTreeResult(data as TreeNode[]))));

  constructor() {
    this.filteredData$.pipe(takeUntilDestroyed()).subscribe(result => {
      this.deptTreeService.dataSource.setData(result.treeData);

      const hasSearchValue = !!this.searchValue;
      if (hasSearchValue) {
        if (this.expandedNodes.length === 0) {
          this.expandedNodes = this.deptTreeService.treeControl.expansionModel.selected;
          this.deptTreeService.treeControl.expansionModel.clear();
        }
        // @ts-ignore
        this.deptTreeService.treeControl.expansionModel.select(...result.needsToExpanded);
      } else {
        if (this.expandedNodes.length) {
          this.deptTreeService.treeControl.expansionModel.clear();
          this.deptTreeService.treeControl.expansionModel.select(...this.expandedNodes);
          this.expandedNodes = [];
        }
      }
      this.deptTreeService.treeControl.expandAll();
    });
  }

  /**
   * From https://stackoverflow.com/a/45290208/6851836
   */
  filterTreeData(data: TreeNode[], value: string): FilteredTreeResult {
    const needsToExpanded = new Set<TreeNode>();
    const _filter = (node: TreeNode, result: TreeNode[]): TreeNode[] => {
      if (node.departmentName.search(value) !== -1) {
        result.push(node);
        return result;
      }
      if (Array.isArray(node.children)) {
        const nodes = node.children.reduce((a, b) => _filter(b, a), [] as TreeNode[]);
        if (nodes.length) {
          const parentNode = { ...node, children: nodes };
          // @ts-ignore
          needsToExpanded.add(parentNode);
          // @ts-ignore
          result.push(parentNode);
        }
      }
      return result;
    };
    const treeData = data.reduce((a, b) => _filter(b, a), [] as TreeNode[]);
    return new FilteredTreeResult(treeData, [...needsToExpanded]);
  }
}
