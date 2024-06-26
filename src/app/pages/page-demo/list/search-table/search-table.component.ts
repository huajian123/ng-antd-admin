import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AntTableConfig, SortFile, AntTableComponent } from '@shared/components/ant-table/ant-table.component';
import { CardTableWrapComponent } from '@shared/components/card-table-wrap/card-table-wrap.component';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { WaterMarkComponent } from '@shared/components/water-mark/water-mark.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
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
import { NzTableQueryParams } from 'ng-zorro-antd/table';

interface SearchParam {
  ruleName: number;
  desc: string;
}

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    PageHeaderComponent,
    NzCardModule,
    WaterMarkComponent,
    FormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzButtonModule,
    NzWaveModule,
    NzIconModule,
    CardTableWrapComponent,
    AntTableComponent,
    NzBadgeModule
  ]
})
export class SearchTableComponent implements OnInit {
  searchParam: Partial<SearchParam> = {};
  @ViewChild('highLightTpl', { static: true }) highLightTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  isCollapse = true;
  tableConfig!: AntTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '查询表格（表头可拖动，点击列表的"查看"按钮，演示在当前tab打开详情操作，如果需要新开tab展示详情，请跳转到"功能>页签操作"中查看演示效果）',
    // desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    breadcrumb: ['首页', '列表页', '查询表格']
  };
  checkedCashArray: NzSafeAny[] = [
    {
      id: '1',
      noShow: '默认不展示',
      longText: '文字超级长文字超级长文字超级长文字超级长文字超级长文字超级长',
      newline: '没有省略号没有省略号没有省略号没有省略号没有省略号没有省略号没有省略号没有省略号',
      addStyle: '加样式',
      name: '自定义模板',
      obj: { a: { b: '点出来的值1' } }
    },
    {
      id: '2',
      noShow: '默认不展示',
      longText: '文字超级长',
      newline: 'string',
      name: '自定义模板',
      addStyle: '加样式',
      obj: { a: { b: '点出来的值1' } }
    }
  ]; // 需修改为对应业务的数据类型
  dataList: NzSafeAny[] = []; // 需修改为对应业务的数据类型

  private modalSrv = inject(NzModalService);
  private message = inject(NzMessageService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // 最左侧复选框选中触发
  selectedChecked(e: NzSafeAny): void {
    this.checkedCashArray = [...e];
  }

  // 刷新页面
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

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    this.dataList = [];
    setTimeout(() => {
      this.dataList = [
        {
          id: '1',
          noShow: '默认不展示',
          longText: '文字超级长文字超级长文字超级长文字超级长文字超级长文字超级长',
          newline: '没有省略号没有省略号没有省略号没有省略号没有省略号没有省略号没有省略号没有省略号',
          addStyle: '加样式',
          name: '自定义模板',
          obj: { a: { b: '点出来的值1' } }
        },
        {
          id: '2',
          noShow: '默认不展示',
          longText: '文字超级长',
          newline: 'string',
          name: '自定义模板',
          addStyle: '加样式',
          obj: { a: { b: '点出来的值1' } }
        },
        {
          id: '3',
          noShow: '默认不展示',
          longText: 'string',
          newline: 'string',
          name: '自定义模板',
          addStyle: '加样式',
          obj: { a: { b: '点出来的值1' } }
        },
        {
          id: '4',
          noShow: '默认不展示',
          longText: 'string',
          newline: 'string',
          name: '自定义模板',
          addStyle: '加样式',
          obj: { a: { b: '点出来的值1' } }
        },
        {
          id: '5',
          noShow: '默认不展示',
          longText: 'string',
          newline: 'string',
          name: '自定义模板',
          addStyle: '加样式',
          obj: { a: { b: '点出来的值1' } }
        },
        {
          id: '6',
          noShow: '默认不展示',
          longText: 'string',
          newline: 'string',
          name: '自定义模板',
          addStyle: '加样式',
          obj: { a: { b: '点出来的值1' } }
        }
      ];
      this.tableConfig.total = 13;
      this.tableConfig.pageIndex = 1;
      this.checkedCashArray = [...this.checkedCashArray];
      this.tableLoading(false);
    });

    /*-----实际业务请求http接口如下------*/
    // this.tableConfig.loading = true;
    // const params: SearchCommonVO<NzSafeAny> = {
    //   pageSize: this.tableConfig.pageSize!,
    //   pageNum: e?.pageIndex || this.tableConfig.pageIndex!,
    //   filters: this.searchParam
    // };
    // this.dataService.getFireSysList(params).pipe(finalize(() => {
    //   this.tableLoading(false);
    // })).subscribe((data => {
    //   const {list, total, pageNum} = data;
    //   this.dataList = [...list];
    //   this.tableConfig.total = total!;
    //   this.tableConfig.pageIndex = pageNum!;
    //   this.tableLoading(false);
    //   this.checkedCashArray = [...this.checkedCashArray];
    // }));
  }

  /*重置*/
  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  /*展开*/
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  /*查看*/
  check(name: string): void {
    // skipLocationChange导航时不要把新状态记入历史时设置为true
    this.router.navigate(['default/page-demo/list/search-table/search-table-detail', name, 123]);
  }

  add(): void {
    // this.modalService.show({nzTitle: '新增'}).subscribe((res) => {
    //   if (!res || res.status === ModalBtnStatus.Cancel) {
    //     return;
    //   }
    //   this.tableLoading(true);
    //   this.addEditData(res.modalValue, 'addFireSys');
    // }, error => this.tableLoading(false));
  }

  // 修改
  edit(id: number): void {
    // this.dataService.getFireSysDetail(id).subscribe(res => {
    //   this.modalService.show({nzTitle: '编辑'}, res).subscribe(({modalValue, status}) => {
    //     if (status === ModalBtnStatus.Cancel) {
    //       return;
    //     }
    //     modalValue.id = id;
    //     this.tableLoading(true);
    //     this.addEditData(modalValue, 'editFireSys');
    //   }, error => this.tableLoading(false));
    // });
  }

  // addEditData(param: FireSysObj, methodName: 'editFireSys' | 'addFireSys'): void {
  //   this.dataService[methodName](param).subscribe(() => {
  //     this.getDataList();
  //   });
  // }

  del(id: number): void {
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '删除后不可恢复',
      nzOnOk: () => {
        this.tableLoading(true);
        /*注释的是模拟接口调用*/
        // this.dataService.delFireSys([id]).subscribe(() => {
        //   if (this.dataList.length === 1) {
        //     this.tableConfig.pageIndex--;
        //   }
        //   this.getDataList();
        //   this.checkedCashArray.splice(this.checkedCashArray.findIndex(item => item.id === id), 1);
        // }, error => this.tableLoading(false));

        setTimeout(() => {
          this.message.info(`id数组(支持分页保存):${JSON.stringify(id)}`);
          this.getDataList();
          this.checkedCashArray.splice(
            this.checkedCashArray.findIndex(item => item.id === id),
            1
          );
          this.tableLoading(false);
        }, 3000);
      }
    });
  }

  allDel(): void {
    if (this.checkedCashArray.length > 0) {
      this.modalSrv.confirm({
        nzTitle: '确定要删除吗？',
        nzContent: '删除后不可恢复',
        nzOnOk: () => {
          const tempArrays: number[] = [];
          this.checkedCashArray.forEach(item => {
            tempArrays.push(item.id);
          });
          this.tableLoading(true);
          // 注释的是模拟接口的调用
          // this.dataService.delFireSys(tempArrays).subscribe(() => {
          //   if (this.dataList.length === 1) {
          //     this.tableConfig.pageIndex--;
          //   }
          //   this.getDataList();
          //   this.checkedCashArray = [];
          // }, error => this.tableLoading(false));
          setTimeout(() => {
            this.message.info(`id数组(支持分页保存):${JSON.stringify(tempArrays)}`);
            this.getDataList();
            this.checkedCashArray = [];
            this.tableLoading(false);
          }, 1000);
        }
      });
    } else {
      this.message.error('请勾选数据');
      return;
    }
  }

  changeSort(e: SortFile): void {
    this.message.info(`排序字段：${e.fileName},排序为:${e.sortDir}`);
  }

  // 修改一页几条
  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  private initTable(): void {
    /*
     * 注意，这里需要留一列不要设置width，让列表自适应宽度
     *
     * */
    this.tableConfig = {
      headers: [
        {
          title: '默认不显示',
          width: 130,
          field: 'noShow',
          show: false
        },
        {
          title: '文字很长',
          width: 130,
          field: 'longText',
          showSort: true
        },
        {
          title: '换行',
          width: 100,
          field: 'newline',
          notNeedEllipsis: true,
          showSort: true,
          tdClassList: ['text-wrap']
        },
        {
          title: '加样式',
          width: 100,
          field: 'addStyle',
          tdClassList: ['operate-text']
        },
        {
          title: '自定义模板',
          field: 'name',
          tdTemplate: this.highLightTpl,
          width: 140
        },
        {
          title: '对象点出来（obj.a.b）',
          field: 'obj.a.b'
        },
        {
          title: '操作',
          tdTemplate: this.operationTpl,
          width: 120,
          fixed: true,
          fixedDir: 'right'
        }
      ],
      total: 0,
      showCheckbox: true,
      loading: false,
      pageSize: 10,
      pageIndex: 1
    };
  }

  ngOnInit(): void {
    this.initTable();
  }
}
