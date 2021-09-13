import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef} from '@angular/core';
import {MyTableConfig} from '../../../share/components/ant-table/ant-table.component';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {Role, SearchCommonVO} from '../../../core/services/types';
import {RoleService} from '../../../core/services/http/internal-manage/role.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {MessageService, MessageType} from '../../../core/services/common/message.service';
import {RoleManageModalService} from '../../../widget/biz-widget/internal-manage/role-manage/role-manage-modal.service';
import {Router} from '@angular/router';
import {ModalBtnStatus} from '../../../widget/base-modal';
import {ActionCode} from 'src/app/configs/actionCode';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleManageComponent implements OnInit {
  @ViewChild('operationTpl', {static: true}) operationTpl!: TemplateRef<any>;
  ActionCode = ActionCode;
  actionCodeObj = {
    add: ActionCode.RoleAdd
  };
  tableConfig!: MyTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '角色管理',
    breadcrumb: ['首页', '内部管理', '角色管理']
  };
  dataList!: Role[];
  checkedCashArray:Role[] = [];

  constructor(private dataService: RoleService, private modalSrv: NzModalService, private cdr: ChangeDetectorRef,
              private messageService: MessageService, private modalService: RoleManageModalService,
              private router: Router) {
    this.dataList = [];
  }

  selectedChecked(e: any): void {
    // @ts-ignore
    this.checkedCashArray = [...e];
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
    this.dataService.getRoles(params).pipe(finalize(() => {
      this.tableLoading(false);
    })).subscribe((data => {
      const {list, total, pageNum} = data;
      this.dataList = [...list];
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableLoading(false);
      this.checkedCashArray = [...this.checkedCashArray];
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

  allDel():void{
    if (this.checkedCashArray.length > 0) {
      this.modalSrv.confirm({
        nzTitle: '确定要删除吗？',
        nzContent: '删除后不可恢复',
        nzOnOk: () => {
          const tempArrays: number[] = [];
          this.checkedCashArray.forEach((item) => {
            tempArrays.push(item.id!);
          });
          this.tableLoading(true);
          this.dataService.delRoles(tempArrays).subscribe(() => {
            if (this.dataList.length === 1) {
              this.tableConfig.pageIndex--;
            }
            this.getDataList();
            this.checkedCashArray = [];
          }, error => this.tableLoading(false));
        }
      });
    } else {
      this.messageService.showAlertMessage('请勾选数据',MessageType.Error);
      return;
    }
  }

  // 删除
  del(id: number): void {
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '删除后不可恢复',
      nzOnOk: () => {
        this.tableLoading(true);
        this.dataService.delRoles([id]).subscribe(() => {
          if (this.dataList.length === 1) {
            this.tableConfig.pageIndex--;
          }
          this.getDataList();
        });
      }
    });
  }

  add(): void {
    this.modalService.show({nzTitle: '新增'}).subscribe((res) => {
      if (!res || res.status === ModalBtnStatus.Cancel) {
        return;
      }
      this.tableLoading(true);
      this.addEditData(res.modalValue, 'addRoles');
    }, error => this.tableLoading(false));
  }

  // 修改
  edit(id: number): void {
    this.dataService.getRolesDetail(id).subscribe(res => {
      this.modalService.show({nzTitle: '编辑'}, res).subscribe(({modalValue, status}) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        modalValue.id = id;
        this.tableLoading(true);
        this.addEditData(modalValue, 'editRoles');
      }, error => this.tableLoading(false));
    });
  }

  addEditData(param: Role, methodName: 'editRoles' | 'addRoles'): void {
    this.dataService[methodName](param).subscribe(() => {
      this.getDataList();
    });
  }

  // 修改一页几条

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: '角色名称',
          field: 'roleName',
          width: 100,
        },
        {
          title: '备注',
          width: 100,
          field: 'roleDesc',
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
