import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzContextMenuService, NzDropdownMenuComponent, NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzCardModule, NzButtonModule, NzWaveModule, NzDropdownModule, NzMenuModule, NzIconModule, NzGridModule, NzAlertModule]
})
export class ContextMenuComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '右键菜单',
    breadcrumb: ['首页', '功能', '右键菜单'],
    desc: '基于 nz-dropdown 实现的上下文菜单，支持多级子菜单与禁用状态'
  };

  private nzContextMenuService = inject(NzContextMenuService);

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  templateExample = `<button nz-button (contextmenu)="contextMenu($event, menu)">
  右键单击
</button>

<nz-dropdown-menu #menu="nzDropdownMenu">
  <ul nz-menu>
    <li nz-menu-item>menu item</li>
    <li nz-menu-item nzDisabled>disabled</li>
    <li nz-submenu nzTitle="sub menu">
      <ul>
        <li nz-menu-item>sub item</li>
      </ul>
    </li>
  </ul>
</nz-dropdown-menu>`;

  componentExample = `import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

private nzContextMenuService = inject(NzContextMenuService);

contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
  this.nzContextMenuService.create($event, menu);
}`;
}
