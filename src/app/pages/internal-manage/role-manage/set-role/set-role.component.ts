import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageHeaderType} from '../../../../share/components/page-header/page-header.component';
import {RoleService} from '../../../../core/services/http/internal-manage/role.service';
import {Permission, PutPermissionParam} from '../../../../core/services/types';
import {map, mergeMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

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
    desc: '当前角色：超级管理员',
    breadcrumb: ['首页', '内部管理', '角色管理', '设置权限']
  };
  authIdArr: string[] = [];
  permissionIdArr: number[] = []; // 存储权限code数组
  permissionList!: Permission[];
  id!: number;

  constructor(private dataService: RoleService, private cdr: ChangeDetectorRef, private routeInfo: ActivatedRoute) {
  }

  // 初始化数据
  initPermission(): void {
    this.dataService.getPermission().pipe(map(res => {
      res.map(item => item.isOpen = false);
      this.permissionList = res;
    }), mergeMap(() => {
      return this.dataService.getPermissionById(this.id);
    })).subscribe((authIdArr) => {
      this.authIdArr = authIdArr;
      this.getAuthIdArr(this.permissionList);
      this.cdr.markForCheck();
    });
  }

  getAuthIdArr(childPermissionArr: Permission[], type: 'initAuthTree' | 'updateAuthTree' = 'initAuthTree'): void {
    childPermissionArr.forEach((item) => {
      // 刚进入该组件设置auth树的check
      if (type === 'initAuthTree') {
        // 如果该角色有这个code
        item.checked = this.authIdArr.includes(item.code);
      } else if (type === 'updateAuthTree') {
        // 如果点击提交，更新权限信息，则
        item.checked ? this.permissionIdArr.push(item.id) : null;
      }
      if (item.permissionVo && item.permissionVo.length > 0) {
        this.getAuthIdArr(item.permissionVo, type);
      }
    });
  }

  getCurrenPermission(): void {
    this.getAuthIdArr(this.permissionList, 'updateAuthTree');
    const param: PutPermissionParam = {
      permissionIds: this.permissionIdArr,
      roleId: this.id
    };
    this.dataService.updatePermission(param).subscribe(() => {});

  }

  submit(): void {
    this.permissionIdArr.length = 0;
    this.getCurrenPermission();
  }

  ngOnInit(): void {
    this.id = this.routeInfo.snapshot.params['id'];
    this.initPermission();
  }
}
