import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageHeaderType} from "../../../../share/components/page-header/page-header.component";

@Component({
  selector: 'app-set-role',
  templateUrl: './set-role.component.html',
  styleUrls: ['./set-role.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.None
})
export class SetRoleComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '设置权限',
    desc:'当前角色：超级管理员',
    breadcrumb: ['首页', '内部管理', '角色管理', '设置权限']
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
