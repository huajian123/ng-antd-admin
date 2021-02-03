import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef} from '@angular/core';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {MyTableConfig} from '../../../share/components/ant-table/ant-table.component';
import {People, Role, SearchCommonVO} from '../../../core/services/types';
import {RoleService} from '../../../core/services/http/internal-manage/role.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {MessageService} from '../../../core/services/common/message.service';
import {InterAddEditService} from '../../../widget/biz-widget/internal-manage/inter-add-edit/inter-add-edit.service';
import {Router} from '@angular/router';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {ModalBtnStatus} from '../../../widget/base-modal';
import { ActionCode } from 'src/app/configs/actionCode';
import {UserManageService} from '../../../core/services/http/internal-manage/user-manage.service';

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
  ActionCode = ActionCode;
  actionCodeObj = {
    add: ActionCode.RoleAdd
  };
  tableConfig!: MyTableConfig;
  dataList!: People[];

  constructor(private dataService: UserManageService, private modalSrv: NzModalService, private cdr: ChangeDetectorRef,
              private messageService: MessageService, private modalService: InterAddEditService,
              private router: Router) {
    this.dataList = [];
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!
    };
    /*    this.dataList = [
          {roleDesc: '1', roleName: '33'}
        ];
        this.tableConfig.pageIndex = 1;
        this.tableConfig.pageSize = 1;
        this.tableConfig.loading = false;
        return;*/
    this.dataService.getPeoples(params).subscribe((data => {
      const {list, total, pageNum} = data;
      this.dataList = [...list];
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
    }), (error => {
      this.tableLoading(false);
    }));
  }


  // 设置权限
  setRole(id: number): void {
    this.router.navigate(['/default/internal-manage/role-manage/set-role', id]);
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

  // 删除
  del(id: number): void {
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '删除后不可恢复',
      nzOnOk: () => {
        this.tableLoading(true);
       /* this.dataService.delRoles(id).subscribe(() => {
          if (this.dataList.length === 1) {
            this.tableConfig.pageIndex--;
          }
          this.getDataList();
        });*/
      }
    });
  }

  add(): void {
    this.modalService.show({nzTitle: '新增'}).subscribe(({modalValue, status}) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      this.tableLoading(true);
      this.addEditData(modalValue, 'addRoles');
    }, error => this.tableLoading(false));
  }

  // 修改
  edit(id: number): void {
    /*this.dataService.getRolesDetail(id).subscribe(res => {
      this.modalService.show({nzTitle: '编辑'}, res).subscribe(({modalValue, status}) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        modalValue.id = id;
        this.tableLoading(true);
        this.addEditData(modalValue, 'editRoles');
      }, error => this.tableLoading(false));
    });*/
  }

  addEditData(param: Role, methodName: 'editRoles' | 'addRoles'): void {
   /* this.dataService[methodName](param).subscribe(() => {
      this.getDataList();
    });*/
  }

  // 修改一页几条

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
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
        },
        {
          title: '状态',
          field: 'available',
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
          title: '所属部门',
          field: 'mobile',
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
  }
}
