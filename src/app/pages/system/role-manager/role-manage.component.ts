/* eslint-disable prettier/prettier */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ActionCode } from '@app/config/actionCode';
import { MessageService } from '@core/services/common/message.service';
import { SearchCommonVO } from '@core/services/types';
import { Role, RoleService } from '@services/system/role.service';
import { MyTableConfig } from '@shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { ModalBtnStatus } from '@widget/base-modal';
import { RoleManageModalService } from '@widget/biz-widget/system/role-manage-modal/role-manage-modal.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

interface SearchParam {
  rolename: string;
}

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleManageComponent implements OnInit {
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<any>;
  searchParam: Partial<SearchParam> = {};
  tableConfig!: MyTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Quản lý vai trò',
    breadcrumb: ['Home', 'Quản lý người dùng', 'Quản lý vai trò']
  };
  dataList: Role[] = [];
  checkedCashArray = [];
  ActionCode = ActionCode;

  constructor(
    private dataService: RoleService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private modalService: RoleManageModalService,
    private router: Router,
    public message: NzMessageService
  ) {}

  selectedChecked(e: any): void {
    // @ts-ignore
    this.checkedCashArray = [...e];
  }

  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService
      .getRoles(params)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(data => {
        const { list, total, pageNum } = data;
        this.dataList = [...list];
        this.tableConfig.total = total!;
        this.tableConfig.pageIndex = pageNum!;
        this.tableLoading(false);
        this.checkedCashArray = [...this.checkedCashArray];
      });
  }

  // 设置权限
  setRole(id: number): void {
    this.router.navigate(['/default/system/role-manager/set-role'], { queryParams: { id: id } });
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
    this.modalService.show({ nzTitle: 'Thêm mới' }).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.tableLoading(true);
        this.addEditData(param, 'addRoles');
      },
      error => this.tableLoading(false)
    );
  }

  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }

  // 修改
  edit(id: string): void {
    this.dataService.getRolesDetail(id).subscribe(res => {
      this.modalService.show({ nzTitle: 'Cập nhật' }, res).subscribe(
        ({ modalValue, status }) => {
          if (status === ModalBtnStatus.Cancel) {
            return;
          }
          modalValue.id = id;
          this.tableLoading(true);
          this.addEditData(modalValue, 'editRoles');
        },
        error => this.tableLoading(false)
      );
    });
  }

  addEditData(param: Role, methodName: 'editRoles' | 'addRoles'): void {
    this.dataService[methodName](param).subscribe(() => {
      this.getDataList();
    });
  }

  del(id: number): void {
    const ids: number[] = [id];
    this.modalSrv.confirm({
      nzTitle: 'Bạn chắc chắn muốn xóa không？',
      nzContent: 'Không khôi phục được khi dữ liệu bị xóa !',
      nzOnOk: () => {
        this.tableLoading(true);
        this.dataService.delRoles(ids).subscribe(
          () => {
            if (this.dataList.length === 1) {
              this.tableConfig.pageIndex--;
            }
            this.getDataList();
          },
          error => this.tableLoading(false)
        );
      }
    });
  }
  // 修改一页几条

  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  ngOnInit(): void {
    this.initTable();
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: 'Tên vai trò',
          field: 'rolename',
          width: 100
        },
        {
          title: 'Mô tả',
          width: 100,
          field: 'mota'
        },
        {
          title: 'Vận hàng',
          tdTemplate: this.operationTpl,
          width: 150,
          fixed: true
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }
}
