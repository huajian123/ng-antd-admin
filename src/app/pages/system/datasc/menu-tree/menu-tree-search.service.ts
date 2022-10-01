import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { MenuTreeService, FlatNode} from '@app/pages/system/datasc/menu-tree/menu-tree.service';
import { FilteredTreeResult, TreeNode} from '@app/pages/system/datasc/menu-tree/filtered-tree-result';
@Injectable({
  providedIn: 'root'
})
export class MenuTreeSearchService {
  expandedNodes: FlatNode[] = [];
  searchValue = '';
  originData$ = this.menutreeService.TREE_DATA$;
  searchValue$ = new BehaviorSubject<string>('');

  filteredData$ = combineLatest([
    this.originData$,
    this.searchValue$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(value => (this.searchValue = value))
    )
    // @ts-ignore
  ]).pipe(map(([data, value]) => (value ? this.filterTreeData(data as TreeNode[], value) : new FilteredTreeResult(data as TreeNode[]))));

  constructor(
    private menutreeService: MenuTreeService
  ) {
    this.filteredData$.subscribe(result => {
      this.menutreeService.dataSource.setData(result.treeData);

      const hasSearchValue = !!this.searchValue;
      if (hasSearchValue) {
        if (this.expandedNodes.length === 0) {
          this.expandedNodes = this.menutreeService.treeControl.expansionModel.selected;
          this.menutreeService.treeControl.expansionModel.clear();
        }
        // @ts-ignore
        this.menutreeService.treeControl.expansionModel.select(...result.needsToExpanded);
      } else {
        if (this.expandedNodes.length) {
          this.menutreeService.treeControl.expansionModel.clear();
          this.menutreeService.treeControl.expansionModel.select(...this.expandedNodes);
          this.expandedNodes = [];
        }
      }
      this.menutreeService.treeControl.expandAll();
    });
   }


  filterTreeData(data: TreeNode[], value: string): FilteredTreeResult {
    const needsToExpanded = new Set<TreeNode>();
    const _filter = (node: TreeNode, result: TreeNode[]): TreeNode[] => {
      if (node.menuName.search(value) !== -1) {
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
