import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ActionCode} from 'src/app/configs/actionCode';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';

@Component({
  selector: 'app-dept-manage',
  templateUrl: './dept-manage.component.html',
  styleUrls: ['./dept-manage.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeptManageComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '部门管理',
    breadcrumb: ['首页', '内部管理', '部门管理']
  };

  ActionCode = ActionCode;
  actionCodeObj = {
    add: ActionCode.RoleAdd
  };

  constructor() {
  }

  // 新增
  add(): void {
    console.log('点击新增');
  }

  ngOnInit(): void {
  }

}
