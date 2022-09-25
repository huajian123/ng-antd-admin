/* eslint-disable prettier/prettier */
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ActionCode } from '@app/config/actionCode';
import { MessageService } from '@core/services/common/message.service';
import { OptionsInterface, SearchCommonVO } from '@core/services/types';
import { AccountService, User } from '@services/system/account.service';
import { MyTableConfig } from '@shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { MapKeyType, MapPipe, MapSet } from '@shared/pipes/map.pipe';
import { ModalBtnStatus } from '@widget/base-modal';
import { AccountModalService } from '@widget/biz-widget/system/account-modal/account-modal.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

interface SearchParam {
  name: string;
  phongban_id: number;
  dienthoai: number;
  available: boolean;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<any>;
  @ViewChild('availableFlag', { static: true }) availableFlag!: TemplateRef<NzSafeAny>;
  searchParam: Partial<SearchParam> = {};
  tableConfig!: MyTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Quản lý tài khoản',
    breadcrumb: ['Home', 'Quản lý người dùng', 'Quản lý tài khoản']
  };
  dataList: User[] = [];
  checkedCashArray: User[] = [];
  ActionCode = ActionCode;
  isCollapse = true;
  availableOptions: OptionsInterface[] = [];

  constructor(
    private dataService: AccountService,
    private modalSrv: NzModalService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService,
    private modalService: AccountModalService,
    private router: Router,
    public message: NzMessageService
  ) {}

  selectedChecked(e: User[]): void {
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
      .getAccount(params)
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
    this.modalService.show({ nzTitle: 'Thêm Mới' }).subscribe(
      res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        this.tableLoading(true);
        this.addEditData(res.modalValue, 'addAccount');
      },
      error => this.tableLoading(false)
    );
  }

  reloadTable(): void {
    this.message.info('Làm mới thành công');
    this.getDataList();
  }

  // 修改
  edit(id: number): void {
    this.dataService.getAccountDetail(id).subscribe(res => {
      this.modalService.show({ nzTitle: 'Cập nhật' }, res).subscribe(({ modalValue, status }) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        modalValue.id = id;
        this.tableLoading(true);
        this.addEditData(modalValue, 'editAccount');
      });
    });
  }

  addEditData(param: User, methodName: 'editAccount' | 'addAccount'): void {
    this.dataService[methodName](param)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(() => {
        this.getDataList();
      });
  }

  changeStatus(e: boolean, id: number): void {
    this.tableConfig.loading = true;
    const people: Partial<User> = {
      id,
      available: !e
    };
    this.dataService
      .editAccount(people as User)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        })
      )
      .subscribe(res => {
        this.getDataList();
      });
  }

  allDel(): void {
    if (this.checkedCashArray.length > 0) {
      const tempArrays: number[] = [];
      this.modalSrv.confirm({
        nzTitle: 'Bạn có chắc chắn muốn xóa nó không?',
        nzContent: 'Không thể phục hồi sau khi xóa',
        nzOnOk: () => {
          this.checkedCashArray.forEach(item => {
            tempArrays.push(item.id);
          });
          this.tableLoading(true);
          this.dataService
            .delAccount(tempArrays)
            .pipe(
              finalize(() => {
                this.tableLoading(false);
              })
            )
            .subscribe(
              () => {
                if (this.dataList.length === 1) {
                  this.tableConfig.pageIndex--;
                }
                this.getDataList();
                this.checkedCashArray = [];
              },
              error => this.tableLoading(false)
            );
        }
      });
    } else {
      this.message.error('Vui lòng đánh dấu vào dữ liệu');
      return;
    }
  }

  del(id: number): void {
    const ids: number[] = [id];
    this.modalSrv.confirm({
      nzTitle: 'Bạn có chắc chắn muốn xóa nó không?',
      nzContent: 'Không thể phục hồi sau khi xóa',
      nzOnOk: () => {
        this.tableLoading(true);
        this.dataService.delAccount(ids).subscribe(
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

  searchDeptIdUser(departmentId: number): void {
    this.searchParam.phongban_id = departmentId;
    this.getDataList();
  }

  /*展开*/
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  ngOnInit(): void {
    this.availableOptions = [...MapPipe.transformMapToArray(MapSet.available, MapKeyType.Boolean)];
    this.initTable();
  }

  private initTable(): void {
    this.tableConfig = {
      showCheckbox: true,
      headers: [
        {
          title: 'Tên tài khoản',
          field: 'name',
          width: 120
        },
        {
          title: 'Trạng thái',
          width: 150,
          field: 'available',
          tdTemplate: this.availableFlag
        },
        {
          title: 'Giới Tính',
          width: 120,
          field: 'sex',
          pipe: 'sex'
        },
        {
          title: 'Điện Thoại',
          width: 150,
          field: 'dienthoai'
        },
        {
          title: 'Email',
          width: 200,
          field: 'email'
        },
        {
          title: 'Đăng nhập lần cuối',
          width: 200,
          field: 'lastLoginTime',
          pipe: 'date:yyyy-MM-dd HH:mm'
        },
        {
          title: 'Ngày khởi tạo',
          width: 150,
          field: 'createdAt',
          pipe: 'date:yyyy-MM-dd HH:mm'
        },
        {
          title: 'Zalo',
          width: 150,
          field: 'zalo'
        },
        {
          title: 'Cập nhật',
          tdTemplate: this.operationTpl,
          width: 200,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      loading: true,
      pageSize: 10,
      pageIndex: 1
    };
  }
}
