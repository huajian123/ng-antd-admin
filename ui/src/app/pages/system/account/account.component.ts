import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ActionCode } from '@app/config/actionCode';
import { OptionsInterface, SearchCommonVO } from '@core/services/types';
import { AccountService, User } from '@services/system/account.service';
import { AntTableConfig, AntTableComponent } from '@shared/components/ant-table/ant-table.component';
import { CardTableWrapComponent } from '@shared/components/card-table-wrap/card-table-wrap.component';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { AuthDirective } from '@shared/directives/auth.directive';
import { MapKeyType, MapPipe, MapSet } from '@shared/pipes/map.pipe';
import { ModalBtnStatus } from '@widget/base-modal';
import { AccountModalService } from '@widget/biz-widget/system/account-modal/account-modal.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTableQueryParams } from 'ng-zorro-antd/table';

import { DeptTreeComponent } from './dept-tree/dept-tree.component';

interface SearchParam {
  userName: string;
  departmentId: number;
  mobile: number;
  available: boolean;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PageHeaderComponent,
    NzGridModule,
    DeptTreeComponent,
    NzCardModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzWaveModule,
    NzIconModule,
    CardTableWrapComponent,
    AntTableComponent,
    AuthDirective,
    NzSwitchModule
  ]
})
export class AccountComponent implements OnInit {
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('availableFlag', { static: true }) availableFlag!: TemplateRef<NzSafeAny>;
  searchParam: Partial<SearchParam> = {};
  tableConfig!: AntTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '账号管理(只mock了admin10这条账号的数据的增删改查接口操作，所有请求入参，响应，请在控制台查看)',
    breadcrumb: ['首页', '用户管理', '账号管理']
  };
  dataList: User[] = [];
  checkedCashArray: User[] = [];
  ActionCode = ActionCode;
  isCollapse = true;
  availableOptions: OptionsInterface[] = [];
  destroyRef = inject(DestroyRef);

  private dataService = inject(AccountService);
  private modalSrv = inject(NzModalService);
  private cdr = inject(ChangeDetectorRef);
  private modalService = inject(AccountModalService);
  private router = inject(Router);
  private message = inject(NzMessageService);

  selectedChecked(e: User[]): void {
    this.checkedCashArray = [...e];
  }

  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<NzSafeAny> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService
      .getAccount(params)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef)
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
    this.modalService
      .show({ nzTitle: '新增' })
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        this.tableLoading(true);
        this.addEditData(res.modalValue, 'addAccount');
      });
  }

  reloadTable(): void {
    this.message.info('刷新成功');
    this.getDataList();
  }

  // 在这里做了一个示例，用于获取选中列的数据，而不通过接口，这里可以通过dataItem获取到当前列的数据，也可以通过id从dataList中找到匹配的数据
  // 推荐使用接口获取详情的方式，因为这样保证了数据的实时性
  // 修改
  edit(id: number, dataItem: User): void {
    console.log(dataItem);
    this.dataService
      .getAccountDetail(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.modalService
          .show({ nzTitle: '编辑' }, res)
          .pipe(
            finalize(() => {
              this.tableLoading(false);
            }),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe(({ modalValue, status }) => {
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
        }),
        takeUntilDestroyed(this.destroyRef)
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
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.getDataList();
      });
  }

  allDel(): void {
    if (this.checkedCashArray.length > 0) {
      const tempArrays: number[] = [];
      this.modalSrv.confirm({
        nzTitle: '确定要删除吗？',
        nzContent: '删除后不可恢复',
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
              }),
              takeUntilDestroyed(this.destroyRef)
            )
            .subscribe(() => {
              if (this.dataList.length === 1) {
                this.tableConfig.pageIndex--;
              }
              this.getDataList();
              this.checkedCashArray = [];
            });
        }
      });
    } else {
      this.message.error('请勾选数据');
      return;
    }
  }

  del(id: number): void {
    const ids: number[] = [id];
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '删除后不可恢复',
      nzOnOk: () => {
        this.tableLoading(true);
        this.dataService
          .delAccount(ids)
          .pipe(
            finalize(() => {
              this.tableLoading(false);
            }),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe(() => {
            if (this.dataList.length === 1) {
              this.tableConfig.pageIndex--;
            }
            this.getDataList();
          });
      }
    });
  }

  // 修改一页几条
  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  searchDeptIdUser(departmentId: number): void {
    this.searchParam.departmentId = departmentId;
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
          title: '用户名称',
          field: 'userName',
          width: 100
        },
        {
          title: '是否可用',
          width: 100,
          field: 'available',
          tdTemplate: this.availableFlag
        },
        {
          title: '性别',
          width: 70,
          field: 'sex',
          pipe: 'sex'
        },
        {
          title: '手机',
          width: 100,
          field: 'mobile'
        },
        {
          title: '邮箱',
          width: 100,
          field: 'email'
        },
        {
          title: '最后登录时间',
          width: 120,
          field: 'lastLoginTime',
          pipe: 'date:yyyy-MM-dd HH:mm'
        },
        {
          title: '创建时间',
          width: 100,
          field: 'createTime',
          pipe: 'date:yyyy-MM-dd HH:mm'
        },
        {
          title: '电话',
          width: 100,
          field: 'telephone'
        },
        {
          title: '所属部门',
          width: 100,
          field: 'departmentName'
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
      pageIndex: 1
    };
  }
}
