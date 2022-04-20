import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '右键菜单示例',
    breadcrumb: ['首页', '功能', '右键菜单'],
    desc:'没什么，搬运的zorro官网示例'
  };
  constructor(private nzContextMenuService: NzContextMenuService) { }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }
  ngOnInit(): void {
  }

}
