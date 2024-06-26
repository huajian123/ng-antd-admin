import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AntTableConfig, SortFile } from '@shared/components/ant-table/ant-table.component';
import { CardTableWrapComponent } from '@shared/components/card-table-wrap/card-table-wrap.component';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { TreeTableComponent } from '@shared/components/tree-table/tree-table.component';
import { WaterMarkComponent } from '@shared/components/water-mark/water-mark.component';
import { fnFlattenTreeDataByDataList } from '@utils/treeTableTools';
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
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
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
    TreeTableComponent,
    NzBadgeModule
  ]
})
export class TreeListComponent implements OnInit {
  @ViewChild('highLightTpl', { static: true }) highLightTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', { static: true }) operationTpl!: TemplateRef<NzSafeAny>;
  searchParam: Partial<SearchParam> = {};

  isCollapse = true;
  tableConfig!: AntTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '树状表格（演示默认值的情况，删除或者查看，可以打印选中行的id）',
    // desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    breadcrumb: ['首页', '列表页', '树状表格']
  };
  checkedCashArray: NzSafeAny[] = [];
  dataList: NzSafeAny[] = [];

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

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    this.dataList = [];
    setTimeout(() => {
      this.dataList = [
        {
          id: `1`,
          name: 'John Brown sr.',
          sex: '男',
          age: 60,
          address: 'New York No. 1 Lake Park',
          children: [
            {
              id: `1-1`,
              name: 'John Brown',
              age: 42,
              sex: '男',
              address: 'New York No. 2 Lake Park'
            },
            {
              id: `1-2`,
              name: 'John Brown jr.',
              age: 30,
              sex: '男',
              address: 'New York No. 3 Lake Park',
              children: [
                {
                  id: `1-2-1`,
                  name: 'Jimmy Brown',
                  sex: '男',
                  age: 16,
                  address: 'New York No. 3 Lake Park'
                }
              ]
            },
            {
              id: `1-3`,
              name: 'Jim Green sr.',
              age: 72,
              sex: '男',
              address: 'London No. 1 Lake Park',
              children: [
                {
                  id: `1-3-1`,
                  name: 'Jim Green',
                  sex: '男',
                  age: 42,
                  address: 'London No. 2 Lake Park',
                  children: [
                    {
                      id: `1-3-1-1`,
                      name: 'Jim Green jr.',
                      sex: '男',
                      age: 25,
                      address: 'London No. 3 Lake Park'
                    },
                    {
                      id: `1-3-1-2`,
                      name: 'Jimmy Green sr.',
                      sex: '男',
                      age: 18,
                      address: 'London No. 4 Lake Park'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: `2`,
          name: 'Joe Black',
          sex: '男',
          age: 32,
          address: 'Sidney No. 1 Lake Park'
        }
      ];
      this.tableConfig.total = 13;
      this.tableConfig.pageIndex = 1;
      const cashFromHttp = [
        {
          id: `1`,
          name: 'John Brown sr.',
          sex: '男',
          age: 60,
          address: 'New York No. 1 Lake Park',
          children: [
            {
              id: `1-2`,
              name: 'John Brown jr.',
              age: 30,
              sex: '男',
              address: 'New York No. 3 Lake Park',
              children: [
                {
                  id: `1-2-1`,
                  name: 'Jimmy Brown',
                  sex: '男',
                  age: 16,
                  address: 'New York No. 3 Lake Park'
                }
              ]
            },
            {
              id: `1-3`,
              name: 'Jim Green sr.',
              age: 72,
              sex: '男',
              address: 'London No. 1 Lake Park',
              children: [
                {
                  id: `1-3-1`,
                  name: 'Jim Green',
                  sex: '男',
                  age: 42,
                  address: 'London No. 2 Lake Park',
                  children: [
                    {
                      id: `1-3-1-1`,
                      name: 'Jim Green jr.',
                      sex: '男',
                      age: 25,
                      address: 'London No. 3 Lake Park'
                    },
                    {
                      id: `1-3-1-2`,
                      name: 'Jimmy Green sr.',
                      sex: '男',
                      age: 18,
                      address: 'London No. 4 Lake Park'
                    }
                  ]
                }
              ]
            }
          ]
        }
      ];
      this.checkedCashArray = fnFlattenTreeDataByDataList(cashFromHttp);
      // this.checkedCashArray = [...this.checkedCashArray];
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

  /*展开*/
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  /*查看*/
  check(id: string, children: NzSafeAny[], parent: NzSafeAny[]): void {
    this.message.success(id);
    console.log(children);
    console.log(parent);
  }

  /*重置*/
  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
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

  del(id: number): void {
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '删除后不可恢复',
      nzOnOk: () => {
        this.tableLoading(true);
        this.message.info(`id数组(支持分页保存):${JSON.stringify(id)}`);
        this.getDataList();
        this.checkedCashArray.splice(
          this.checkedCashArray.findIndex(item => item.id === id),
          1
        );
        this.tableLoading(false);
        /*注释的是模拟接口调用*/
        // this.dataService.delFireSys([id]).subscribe(() => {
        //   if (this.dataList.length === 1) {
        //     this.tableConfig.pageIndex--;
        //   }
        //   this.getDataList();
        //   this.checkedCashArray.splice(this.checkedCashArray.findIndex(item => item.id === id), 1);
        // }, error => this.tableLoading(false));
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
          this.message.info(`数组(支持分页保存):${JSON.stringify(tempArrays)}`);
          this.getDataList();
          this.checkedCashArray = [];
          this.tableLoading(false);
          // 注释的是模拟接口的调用
          // this.dataService.delFireSys(tempArrays).subscribe(() => {
          //   if (this.dataList.length === 1) {
          //     this.tableConfig.pageIndex--;
          //   }
          //   this.getDataList();
          //   this.checkedCashArray = [];
          // }, error => this.tableLoading(false));
        }
      });
    } else {
      this.message.error('请勾选数据');
      return;
    }
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

  changeSort(e: SortFile): void {
    this.message.info(`排序字段：${e.fileName},排序为:${e.sortDir}`);
  }

  // 最左侧复选框选中触发
  selectedChecked(e: NzSafeAny): void {
    this.checkedCashArray = [...e];
    console.log(this.checkedCashArray);
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
          title: '姓名',
          width: 230,
          field: 'name',
          showSort: true,
          tdClassList: ['operate-text']
        },
        {
          title: '性别',
          field: 'sex',
          width: 230,
          tdTemplate: this.highLightTpl
        },
        {
          title: '年龄',
          field: 'age',
          width: 230,
          showSort: true
        },
        {
          title: '住址',
          field: 'address'
        },
        {
          title: '操作',
          tdTemplate: this.operationTpl,
          width: 130,
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
