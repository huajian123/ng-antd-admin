import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, TemplateRef, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { ActionCode } from '@app/config/actionCode';
import { SearchCommonVO } from '@core/services/types';
import { Role, RoleService } from '@services/system/role.service';
import { AntTableConfig, AntTableComponent } from '@shared/components/ant-table/ant-table.component';
import { CardTableWrapComponent } from '@shared/components/card-table-wrap/card-table-wrap.component';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { AuthDirective } from '@shared/directives/auth.directive';
import { ModalBtnStatus } from '@widget/base-modal';
import { RoleManageModalService } from '@widget/biz-widget/system/role-manage-modal/role-manage-modal.service';
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

interface SearchParam {
  roleName: string;
}

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageHeaderComponent,
    NzCardModule,
    FormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzWaveModule,
    NzIconModule,
    CardTableWrapComponent,
    AntTableComponent,
    AuthDirective
  ]
})
export class RoleManageComponent implements OnInit {
  readonly operationTpl = viewChild.required<TemplateRef<NzSafeAny>>('operationTpl');
  searchParam: Partial<SearchParam> = {};
  tableConfig!: AntTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '角色管理',
    breadcrumb: ['首页', '用户管理', '角色管理']
  };
  dataList: Role[] = [];
  checkedCashArray = [];
  ActionCode = ActionCode;
  destroyRef = inject(DestroyRef);

  private dataService = inject(RoleService);
  private modalSrv = inject(NzModalService);
  private cdr = inject(ChangeDetectorRef);
  private modalService = inject(RoleManageModalService);
  private router = inject(Router);
  private message = inject(NzMessageService);

  selectedChecked(e: NzSafeAny): void {
    // @ts-ignore
    this.checkedCashArray = [...e];
  }

  resetForm(): void {
    this.searchParam = {};
    this.getDataList({ pageIndex: 1 });
  }

  getDataList(e?: { pageIndex: number }): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<NzSafeAny> = {
      pageSize: this.tableConfig.pageSize!,
      pageIndex: e?.pageIndex || this.tableConfig.pageIndex!,
      filters: this.searchParam
    };
    this.dataService
      .getRoles(params)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(data => {
        const { list, total, pageIndex } = data;
        this.dataList = [...list];
        this.tableConfig.total = total!;
        this.tableConfig.pageIndex = pageIndex!;
        this.tableLoading(false);
        this.checkedCashArray = [...this.checkedCashArray];
      });
  }

  // 设置权限
  setRole(id: number, roleName: string): void {
    this.router.navigate(['/default/system/role-manager/set-role'], { queryParams: { id, roleName } });
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
        const param = { ...res.modalValue };
        this.tableLoading(true);
        this.addEditData(param, 'addRoles');
      });
  }

  reloadTable(): void {
    this.message.info('刷新成功');
    this.getDataList();
  }

  // 在这里做了一个示例，用于获取选中列的数据，而不通过接口，这里可以通过dataItem获取到当前列的数据，也可以通过id从dataList中找到匹配的数据
  // 推荐使用接口获取详情的方式，因为这样保证了数据的实时性
  // 修改
  edit(id: number, dataItem: Role): void {
    this.dataService
      .getRolesDetail(id)
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
            this.addEditData(modalValue, 'editRoles');
          });
      });
  }

  addEditData(param: Role, methodName: 'editRoles' | 'addRoles'): void {
    this.dataService[methodName](param)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.getDataList();
      });
  }

  del(id: number): void {
    const ids: number[] = [id];
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '删除后不可恢复',
      nzOnOk: () => {
        this.tableLoading(true);
        this.dataService
          .delRoles(ids)
          .pipe(
            finalize(() => {
              this.tableLoading(false);
            }),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe(() => {
            // 例如分页第二页只有一条数据，此时删除这条数据，跳转到第一页，并重新查询一下列表,pageIndex改变会由changePageIndex自动触发表格查询getDataList（）
            if (this.dataList.length === 1 && this.tableConfig.pageIndex !== 1) {
              this.tableConfig.pageIndex--;
            } else {
              this.getDataList();
            }
          });
      }
    });
  }

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
          title: '角色名称',
          field: 'roleName',
          width: 100
        },
        {
          title: '备注',
          width: 100,
          field: 'roleDesc'
        },
        {
          title: '操作',
          tdTemplate: this.operationTpl(),
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
