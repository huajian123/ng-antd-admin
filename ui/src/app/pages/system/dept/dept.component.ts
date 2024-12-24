import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, ChangeDetectorRef, inject, DestroyRef, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { ActionCode } from '@app/config/actionCode';
import { OptionsInterface, SearchCommonVO } from '@core/services/types';
import { Dept, DeptService } from '@services/system/dept.service';
import { AntTableConfig, SortFile } from '@shared/components/ant-table/ant-table.component';
import { CardTableWrapComponent } from '@shared/components/card-table-wrap/card-table-wrap.component';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { TreeNodeInterface, TreeTableComponent } from '@shared/components/tree-table/tree-table.component';
import { AuthDirective } from '@shared/directives/auth.directive';
import { MapKeyType, MapPipe, MapSet } from '@shared/pipes/map.pipe';
import { fnFlatDataHasParentToTree, fnFlattenTreeDataByDataList, fnSortTreeData } from '@utils/treeTableTools';
import { ModalBtnStatus } from '@widget/base-modal';
import { DeptManageModalService } from '@widget/biz-widget/system/dept-manage-modal/dept-manage-modal.service';
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
import { NzTagModule } from 'ng-zorro-antd/tag';

interface SearchParam {
  departmentName: string;
  state: boolean;
}

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    PageHeaderComponent,
    NzCardModule,
    FormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzWaveModule,
    NzIconModule,
    CardTableWrapComponent,
    TreeTableComponent,
    NgTemplateOutlet,
    NzTagModule,
    AuthDirective
  ]
})
export class DeptComponent implements OnInit {
  readonly operationTpl = viewChild.required<TemplateRef<NzSafeAny>>('operationTpl');
  readonly state = viewChild.required<TemplateRef<NzSafeAny>>('state');
  ActionCode = ActionCode;
  searchParam: Partial<SearchParam> = {};
  destroyRef = inject(DestroyRef);
  tableConfig!: AntTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '部门管理',
    breadcrumb: ['首页', '系统管理', '部门管理']
  };
  dataList: TreeNodeInterface[] = [];
  stateOptions: OptionsInterface[] = [];

  private deptModalService = inject(DeptManageModalService);
  private dataService = inject(DeptService);
  private modalSrv = inject(NzModalService);
  private message = inject(NzMessageService);
  private cdr = inject(ChangeDetectorRef);

  reloadTable(): void {
    this.message.info('已经刷新了');
    this.getDataList();
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

  getDataList(sortFile?: SortFile): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<NzSafeAny> = {
      pageSize: 0,
      pageIndex: 0,
      filters: this.searchParam
    };
    this.dataService
      .getDepts(params)
      .pipe(
        finalize(() => {
          this.tableLoading(false);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(deptList => {
        const target = fnFlatDataHasParentToTree(deptList.list);
        this.dataList = fnFlattenTreeDataByDataList(target);
        // 因为前段要对后端返回的数据进行处理，所以排序这里交给了前段来做
        if (sortFile) {
          fnSortTreeData(this.dataList, sortFile);
        }
        this.tableLoading(false);
      });
  }

  /*查看*/
  check(id: string, children: any[], parent: any[]): void {
    this.message.success(id);
  }

  /*重置*/
  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  add(fatherId: number): void {
    this.deptModalService
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
        param.fatherId = fatherId;
        this.tableLoading(true);
        this.addEditData(param, 'addDepts');
      });
  }

  addEditData(param: Dept, methodName: 'editDepts' | 'addDepts'): void {
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

  del(id: number): void {
    const ids: number[] = [id];
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '删除后不可恢复',
      nzOnOk: () => {
        this.tableLoading(true);
        this.dataService
          .delDepts(ids)
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

  // 修改
  edit(id: number, fatherId: number): void {
    this.dataService
      .getDeptsDetail(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        this.deptModalService
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
            modalValue.fatherId = fatherId;
            this.tableLoading(true);
            this.addEditData(modalValue, 'editDepts');
          });
      });
  }

  changeSort(e: SortFile): void {
    this.getDataList(e);
  }

  // 修改一页几条
  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: '部门名称',
          width: 230,
          field: 'departmentName'
        },
        {
          title: '部门状态',
          field: 'state',
          tdTemplate: this.state(),
          width: 100
        },
        {
          title: '排序',
          field: 'orderNum',
          showSort: true,
          width: 100
        },
        {
          title: '创建时间',
          field: 'createdAt',
          pipe: 'date:yyyy-MM-dd HH:mm',
          width: 180
        },
        {
          title: '操作',
          tdTemplate: this.operationTpl(),
          width: 180,
          fixed: false,
          fixedDir: 'right'
        }
      ],
      total: 0,
      showCheckbox: false,
      loading: false,
      pageSize: 10,
      pageIndex: 1
    };
  }

  ngOnInit(): void {
    this.initTable();
    this.stateOptions = [...MapPipe.transformMapToArray(MapSet.available, MapKeyType.Boolean)];
  }
}
