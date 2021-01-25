import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageHeaderType} from '../../../../share/components/page-header/page-header.component';
import {RoleService} from '../../../../core/services/http/internal-manage/role.service';
import {Permission} from '../../../../core/services/types';

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
  permissionList!: Permission[];

  constructor(private dataService: RoleService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dataService.getPermission().subscribe(res => {
      res.map(item => item.isOpen = false);
      this.permissionList = res;
      this.cdr.markForCheck();
    });
  }

}
