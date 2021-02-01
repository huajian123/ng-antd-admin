import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ActionCode} from 'src/app/configs/actionCode';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {DeptObj} from '../../../core/services/types';
import {DeptManageService} from '../../../core/services/http/internal-manage/dept-manage.service';
import {map} from 'rxjs/operators';

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
  dataList!: DeptObj[];
  actionCodeObj = {
    add: ActionCode.RoleAdd
  };

  constructor(private dataService: DeptManageService, private cdr: ChangeDetectorRef) {
  }

  collapse(event: boolean, item: DeptObj): void {
    item.expand = event;
  }

  // 新增
  add(): void {
    console.log('点击新增');
  }

  dataAddExpandFn(dataList: DeptObj[]): DeptObj[] {
    dataList.forEach((item) => {
      item.expand = false;
      if (item.departmentVos && item.departmentVos.length > 0) {
        this.dataAddExpandFn(item.departmentVos);
      }
    });
    return dataList;
  }

  dataAddExpand(dataList: DeptObj[]): DeptObj[] {
    return this.dataAddExpandFn(dataList);
  }

  getDataList(): void {
    this.dataService.getDeptList().pipe(map((res: DeptObj[]) => this.dataAddExpand(res))).subscribe(result => {
      this.dataList = result;
      this.cdr.markForCheck();
    });
  }

  edit(id: number): void {
    console.log(id);
  }

  del(id: number): void {
    console.log(id);
  }

  ngOnInit(): void {
    this.getDataList();
  }

}
