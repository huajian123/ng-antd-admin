import { NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, ViewEncapsulation, input, signal, computed } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Menu } from '@core/services/types';
import { MenusService } from '@services/system/menus.service';
import { PutPermissionParam, RoleService } from '@services/system/role.service';
import { FooterSubmitComponent } from '@shared/components/footer-submit/footer-submit.component';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { fnAddTreeDataGradeAndLeaf, fnFlatDataHasParentToTree, fnFlattenTreeDataByDataList } from '@utils/treeTableTools';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-set-role',
  templateUrl: './set-role.component.html',
  styleUrl: './set-role.component.less',

  encapsulation: ViewEncapsulation.None,
  imports: [PageHeaderComponent, NzCardModule, NzCheckboxModule, FormsModule, NzIconModule, NzButtonModule, NzDividerModule, NzResultModule, NgTemplateOutlet, FooterSubmitComponent, NzWaveModule]
})
export class SetRoleComponent implements OnInit {
  pageHeaderInfo = signal<Partial<PageHeaderType>>({
    title: '设置权限',
    desc: '当前角色：',
    breadcrumb: ['首页', '用户管理', '角色管理', '设置权限']
  });
  readonly id = input.required<string>(); // 从路由中获取的角色id，ng16支持的新特性
  readonly roleName = input.required<string>(); // 从路由中获取的角色名称，ng16支持的新特性
  readonly authCodes = input.required<string[]>(); // 由路由 resources 加载并自动绑定v22.2.0提供

  private dataService = inject(RoleService);
  private menusService = inject(MenusService);
  private router = inject(Router);
  private message = inject(NzMessageService);
  private destroyRef = inject(DestroyRef);

  // 获取所有菜单
  menuListResource = this.menusService.getMenuListResource(() => ({ pageSize: 0, pageIndex: 0, filters: {} as NzSafeAny }));

  permissionList = computed<Array<Menu & { isOpen?: boolean; checked?: boolean }>>(() => {
    if (!this.menuListResource.hasValue()) {
      return [];
    }
    const authCodes = this.authCodes();
    // isOpen表示 节点是否展开
    const menuArray: Array<Menu & { isOpen?: boolean; checked?: boolean }> = this.menuListResource.value().list;
    menuArray.forEach(item => {
      item.isOpen = false;
      item.checked = authCodes.includes(item.code);
    });
    return fnAddTreeDataGradeAndLeaf(fnFlatDataHasParentToTree(menuArray));
  });

  getRoleName(): void {
    this.pageHeaderInfo.update(v => ({ ...v, desc: `当前角色：${this.roleName()}` }));
  }

  back(): void {
    this.router.navigateByUrl(`/default/system/role-manager`);
  }

  submit(): void {
    const temp = [...this.permissionList()];
    const flatArray = fnFlattenTreeDataByDataList(temp);
    const selectedAuthCodeArray: string[] = [];
    flatArray.forEach(item => {
      if (item['checked']) {
        selectedAuthCodeArray.push(item['code']);
      }
    });
    const param: PutPermissionParam = {
      permCodes: selectedAuthCodeArray,
      roleId: +this.id()
    };
    this.dataService
      .updatePermission(param)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.message.success('设置成功，重新登录后生效');
      });
  }

  _onReuseInit(): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.getRoleName();
  }
}
