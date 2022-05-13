import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {Menu, PutPermissionParam} from "@core/services/types";
import {RoleService} from "@services/system/role.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {concatMap} from "rxjs/operators";
import {MenusService} from "@services/system/menus.service";
import {fnAddTreeDataGradeAndLeaf, fnFlatDataHasParentToTree, fnFlattenTreeDataByDataList} from "@utils/treeTableTools";

@Component({
  selector: 'app-set-role',
  templateUrl: './set-role.component.html',
  styleUrls: ['./set-role.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SetRoleComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '设置权限',
    desc: '当前角色：',
    breadcrumb: ['首页', '用户管理', '角色管理', '设置权限']
  };
  authCodeArr: string[] = [];
  permissionList: (Menu & { isOpen?: boolean, checked?: boolean })[] = [];
  id!: number;
  roleName!: string;

  constructor(private dataService: RoleService, private cdr: ChangeDetectorRef,
              private menusService: MenusService,
              private routeInfo: ActivatedRoute, private router: Router,
              public message: NzMessageService) {
  }

  // 初始化数据
  initPermission(): void {
    // 通过角色id获取这个角色拥有的权限码
    this.dataService.getPermissionById(this.id).pipe(concatMap((authCodeArr => {
      this.authCodeArr = authCodeArr;
      // 获取所有菜单
      return this.menusService.getMenuList({pageNum: 0, pageSize: 0})
    }))).subscribe(response => {
      // isOpen表示 节点是否展开
      const menuArray: (Menu & { isOpen?: boolean, checked?: boolean })[] = response.list;
      menuArray.forEach(item => {
        item.isOpen = false;
        item.checked = this.authCodeArr.includes(item.code!);
      });
      this.permissionList = fnAddTreeDataGradeAndLeaf(fnFlatDataHasParentToTree(menuArray));
      this.cdr.markForCheck();
    })
  }

  getRoleName(): void {
    this.dataService.getRolesDetail(this.id).subscribe(({roleName}) => {
      this.pageHeaderInfo = {...this.pageHeaderInfo, ...{desc: `当前角色：${roleName}`}};
      this.cdr.markForCheck();
    });
  }

  back(): void {
    this.router.navigateByUrl(`/default/system/role-manager`);
  }

  submit(): void {
    const temp = [...this.permissionList]
    const flatArray = fnFlattenTreeDataByDataList(temp);
    const seledAuthArray: number[] = [];
    flatArray.forEach(item => {
      if (item['checked']) {
        seledAuthArray.push(+item.id)
      }
    })
    const param: PutPermissionParam = {
      permissionIds: seledAuthArray,
      roleId: +this.id
    };
    this.dataService.updatePermission(param).subscribe(() => {
      this.message.success('设置成功，重新登录后生效');
    });
  }

  _onReuseInit(): void {
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.routeInfo.queryParams.subscribe(res => {
      this.id = res['id'];
      this.getRoleName();
      this.initPermission();
    });
  }
}
