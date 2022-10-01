import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

import { MenuTreeSearchService} from '@app/pages/system/datasc/menu-tree/menu-tree-search.service';
import { MenuTreeService, FlatNode} from '@app/pages/system/datasc/menu-tree/menu-tree.service';

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuTreeService, MenuTreeSearchService]
})
export class MenuTreeComponent implements OnInit {
  selectListSelection: SelectionModel<FlatNode>;
  treeControl: FlatTreeControl<FlatNode>;
  @Output() readonly menutIdEven = new EventEmitter<number>();

  constructor(
    public menutreesearchService: MenuTreeSearchService,
    public menutreeService: MenuTreeService
  ) { 
    this.selectListSelection = this.menutreeService.selectListSelection;
    this.treeControl = this.menutreeService.treeControl;
  }

  changeSearch(event: string): void {
    this.menutreesearchService.searchValue$.next(event);
  }

  clickNode(node: FlatNode): void {
    this.menutreeService.clickNode(node);
    this.menutIdEven.emit(node.id);
  }

  resetTree(): void {
    this.menutreeService.resetTree();
  }

  ngOnInit(): void {
    this.menutreeService.initDate();
  }

}
