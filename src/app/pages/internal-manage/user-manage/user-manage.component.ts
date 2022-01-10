import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef} from '@angular/core';
import {PageHeaderType} from '@shared/components/page-header/page-header.component';
import {MyTableConfig} from '@shared/components/ant-table/ant-table.component';
import {OptionsInterface, People, SearchCommonVO} from '@core/services/types';
import {NzModalService} from 'ng-zorro-antd/modal';
import {MessageService} from '@core/services/common/message.service';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {ModalBtnStatus} from '@widget/base-modal';
import {UserManageService} from '@core/services/http/internal-manage/user-manage.service';
import {MapKeyType, MapPipe, MapSet} from '@shared/pipes/map.pipe';
import {UserManageModalService} from '@widget/biz-widget/internal-manage/user-manage/user-manage-modal.service';
import {ResetPasswordModalService} from '@widget/biz-widget/internal-manage/user-manage/reset-password-modal/reset-password-modal.service';
import { ActionCode } from 'src/app/config/actionCode';

interface SearchParam {
  userName: string;
  available: boolean;
  mobile: string;
  beginTime: number;
  endTime: number;
  createTime: Date[];
}

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserManageComponent implements OnInit {

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '人员管理',
    breadcrumb: ['首页', '内部管理', '人员管理']
  };
  @ViewChild('operationTpl', {static: true}) operationTpl!: TemplateRef<any>;
  @ViewChild('statusSwitchTpl', {static: true}) statusSwitchTpl!: TemplateRef<any>;
  ActionCode = ActionCode;
  actionCodeObj = {
    add: ActionCode.RoleAdd
  };
  tableConfig!: MyTableConfig;
  dataList!: People[];
  isCollapse = true;
  isEnabledOptions: OptionsInterface[] = [];
  searchParam: Partial<SearchParam> = {};
  switchMap = new Map();

  constructor(private dataService: UserManageService, private modalSrv: NzModalService, private cdr: ChangeDetectorRef,
              private messageService: MessageService, private modalService: UserManageModalService,
              private resetPasswordModalSrv: ResetPasswordModalService) {
    this.dataList = [];
  }

  /*重置*/
  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  changeCreateTime(event: Date[]): void {
    this.searchParam.beginTime = event[0].getTime();
    this.searchParam.endTime = event[1].getTime();
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<Partial<SearchParam>> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService.getPeoples(params).subscribe((data => {
      const {list, total, pageNum} = data;
      this.dataList = [...list];
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.dataList.forEach(({id, available}) => {
        this.switchMap.set(id, available);
      });
      this.tableLoading(false);
    }), (error => {
      this.tableLoading(false);
    }));
  }


  // 重置密码
  resetPassword(id: number): void {
    this.resetPasswordModalSrv.show({nzTitle: '重置密码'}).subscribe(({modalValue, status}) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      modalValue.id = id;
      this.tableLoading(true);
      this.addEditData(modalValue, 'editUsers');
    }, error => this.tableConfig.loading = false);
  }

  // 触发表格变更检测
  tableChangeDectction(): void {
    // 改变引用触发变更检测。
    this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  tableLoading(isLoading: boolean): void {
    this.tableConfig.loading = isLoading;
    this.tableChangeDectction();
  }

  add(): void {
    this.modalService.show({nzTitle: '新增人员'}).subscribe(({modalValue, status}) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      this.tableLoading(true);
      this.addEditData(modalValue, 'addUsers');
    }, error => this.tableLoading(false));
  }

  // 修改
  edit(id: number): void {
    this.dataService.getUserDetail(id).subscribe(res => {
      this.modalService.show({nzTitle: '编辑'}, res).subscribe(({modalValue, status}) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        modalValue.id = id;
        this.tableLoading(true);
        this.addEditData(modalValue, 'editUsers');
      }, error => this.tableLoading(false));
    });
  }

  addEditData(param: People, methodName: 'editUsers' | 'addUsers'): void {

    if (Array.isArray(param.departmentId)) {
      param.departmentId = param.departmentId.pop()!;
    }
    param.mobile = Number(param.mobile);
    this.dataService[methodName](param).subscribe(() => {
      this.getDataList();
    });
  }

  // 修改一页几条

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  changeStatus(e: boolean, id: number): void {
    this.tableConfig.loading = true;
    const people: Partial<People> = {
      id,
      available: !e
    };
    this.dataService.editUsers(people as People).subscribe(res => {
      this.getDataList();
    });
  }

  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: '用户名',
          field: 'userName',
        },
        {
          title: '性别',
          field: 'sex',
          width: 60,
          pipe: 'sex'
        },
        {
          title: '状态',
          tdTemplate: this.statusSwitchTpl,
          field: 'available',
          pipe: 'available',
          width: 80,
        },
        {
          title: '联系电话',
          field: 'telephone',
        },
        {
          title: '手机号',
          field: 'mobile',
        },
        {
          title: '电子邮箱',
          field: 'email',
        },
        {
          title: '所属部门',
          field: 'departmentName',
        },
        {
          title: '用户角色',
          field: 'roleName'
        },
        {
          title: '最后登录时间',
          field: 'lastLoginTime',
          pipe: 'date:yyyy-MM-dd HH:mm'
        },
        {
          title: '创建时间',
          field: 'createTime',
          pipe: 'date:yyyy-MM-dd HH:mm'
        },
        {
          title: '操作',
          tdTemplate: this.operationTpl,
          width: 150,
          fixed: true
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1,
    };
  }

  ngOnInit(): void {
    this.initTable();
    this.isEnabledOptions = [...MapPipe.transformMapToArray(MapSet.available, MapKeyType.Boolean)];
  }
}
