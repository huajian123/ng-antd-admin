import { Component, DestroyRef, inject, OnInit, signal, TemplateRef, viewChild, computed, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';

import { ActionCode } from '@app/config/actionCode';
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

const DEFAULT_SEARCH_PARAM: SearchParam = {
  roleName: ''
};

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',

  imports: [
    PageHeaderComponent,
    NzCardModule,
    FormField,
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
  searchModel = signal<SearchParam>({ ...DEFAULT_SEARCH_PARAM });
  searchForm = form(this.searchModel);
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: '角色管理，设置权限按钮演示v22.2.0提供的路由resource',
    breadcrumb: ['首页', '用户管理', '角色管理']
  };
  checkedCashArray = [];
  ActionCode = ActionCode;

  private dataService = inject(RoleService);
  private modalSrv = inject(NzModalService);
  private modalService = inject(RoleManageModalService);
  private router = inject(Router);
  private message = inject(NzMessageService);
  private destroyRef = inject(DestroyRef);

  private requestPageSize = signal(10);
  private requestPageIndex = signal(1);
  private searchFilters = signal<Partial<SearchParam>>({});

  roleResource = this.dataService.getRolesResource(() => ({
    pageSize: this.requestPageSize(),
    pageIndex: this.requestPageIndex(),
    filters: this.searchFilters() as NzSafeAny
  }));

  dataList = computed(() => {
    if (this.roleResource.hasValue()) {
      return [...this.roleResource.value().list];
    }
    return [] as Role[];
  });

  tableConfig = signal<AntTableConfig>({ headers: [], total: 0, showCheckbox: false, loading: false, pageSize: 10, pageIndex: 1 });

  private syncTableConfig = effect(() => {
    const isLoading = this.roleResource.isLoading();
    const hasValue = this.roleResource.hasValue();
    this.tableConfig.update(c => ({
      ...c,
      loading: isLoading,
      ...(hasValue
        ? {
            total: this.roleResource.value().total!,
            pageIndex: this.roleResource.value().pageIndex!
          }
        : {})
    }));
  });

  selectedChecked(e: NzSafeAny): void {
    // @ts-ignore
    this.checkedCashArray = [...e];
  }

  resetForm(): void {
    this.searchModel.set({ ...DEFAULT_SEARCH_PARAM });
    this.searchFilters.set({});
    this.requestPageIndex.set(1);
  }

  getDataList(e: number): void {
    // 过滤掉空值,只传递有实际值的搜索条件
    const filters = Object.fromEntries(Object.entries(this.searchModel()).filter(([_, value]) => value !== null && value !== ''));
    this.searchFilters.set(filters);
    this.requestPageIndex.set(e);
  }

  // 设置权限
  setRole(id: number, roleName: string): void {
    this.router.navigate(['/default/system/role-manager/set-role', id], { queryParams: { roleName } });
  }

  add(): void {
    this.modalService
      .show({ nzTitle: '新增' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        if (!res || res.status === ModalBtnStatus.Cancel) {
          return;
        }
        const param = { ...res.modalValue };
        this.addEditData(param, 'addRoles');
      });
  }

  reloadTable(): void {
    this.message.info('刷新成功');
    this.roleResource.reload();
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
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(({ modalValue, status }) => {
            if (status === ModalBtnStatus.Cancel) {
              return;
            }
            modalValue.id = id;
            this.addEditData(modalValue, 'editRoles');
          });
      });
  }

  addEditData(param: Role, methodName: 'editRoles' | 'addRoles'): void {
    this.dataService[methodName](param)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.roleResource.reload();
      });
  }

  del(id: number): void {
    const ids: number[] = [id];
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '删除后不可恢复',
      nzOnOk: () => {
        this.dataService
          .delRoles(ids)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            // 例如分页第二页只有一条数据，此时删除这条数据，跳转到第一页，并重新查询一下列表,pageIndex改变会由changePageIndex自动触发表格查询getDataList（）
            if (this.dataList().length === 1 && this.tableConfig().pageIndex !== 1) {
              this.tableConfig.update(c => ({ ...c, pageIndex: c.pageIndex! - 1 }));
            } else {
              this.roleResource.reload();
            }
          });
      }
    });
  }

  changePageSize(e: number): void {
    this.requestPageSize.set(e);
  }

  ngOnInit(): void {
    this.initTable();
  }

  private initTable(): void {
    this.tableConfig.set({
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
    });
  }
}
