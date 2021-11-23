import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyTableConfig, SortFile} from '../../../shared/components/ant-table/ant-table.component';
import {PageHeaderType} from '../../../shared/components/page-header/page-header.component';

import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {SearchCommonVO} from '../../../core/services/types';
import {Router} from '@angular/router';
import {ActionCode} from "../../../config/actionCode";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchTableComponent implements OnInit {
  @ViewChild('highLightTpl', {static: true}) highLightTpl!: TemplateRef<any>;
  @ViewChild('operationTpl', {static: true}) operationTpl!: TemplateRef<any>;
  validateForm!: FormGroup;
  isCollapse = true;
  tableConfig!: MyTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '查询表格（表头可拖动）',
    // desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    breadcrumb: ['首页', '列表页', '查询表格']
  };
  cashArray: any[] = [];
  dataList: any[] = [];
  actionCodeObj = {
    add: ActionCode.RoleAdd
  };

  constructor(private fb: FormBuilder,
              public message: NzMessageService,
              private router: Router, private cdr: ChangeDetectorRef) {
  }

  reloadTable(): void {
    this.message.info('已经刷新了')
    this.getDataList();
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex! || this.tableConfig.pageIndex!
    };
    this.dataList = [];
    this.tableConfig.loading = false;
    this.dataList = [
      {
        id: '1',
        productName: '文字超级长文字超级长文字超级长文字超级长文字超级长文字超级长',
        casNo: '没有省略号没有省略号没有省略号没有省略号没有省略号没有省略号没有省略号没有省略号',
        file3: '加样式'
      },
      {
        id: '2',
        productName: '文字超级长',
        casNo: 'string',
        file3: '加样式',
      },
      {
        id: '3',
        productName: 'string',
        casNo: 'string',
        file3: '加样式',
      },
      {
        id: '4',
        productName: 'string',
        casNo: 'string',
        file3: '加样式',
      },
      {
        id: '5',
        productName: 'string',
        casNo: 'string',
        file3: '加样式',
      },
      {
        id: '6',
        productName: 'string',
        casNo: 'string',
        file3: '加样式',
      },
    ];
    this.tableConfig.total = 6;
    this.tableConfig.pageIndex = 1;
    /*   this.dataService.getProjectlist(params).subscribe((data) => {
         const {list, total, pageNum} = data;
         this.dataList = list;
         console.log(this.dataList);
         this.tableConfig.total = total;
         this.tableConfig.pageIndex = pageNum;
         this.tableConfig.loading = false;
       },()=>{
         this.tableConfig.loading = false;
       });*/
  }


  /*展开*/
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  /*查看*/
  check(name: string): void {
    // skipLocationChange导航时不要把新状态记入历史时设置为true
    this.router.navigate(['default/list/search-table/search-table-detail'], {
      queryParams: {name},
      skipLocationChange: true
    });
  }

  /*重置*/
  resetForm(): void {
    this.validateForm.reset();
  }

  add(): void {

  }

  del(): void {
    this.message.info('控制台打印出被勾选中的列了，是支持分页保存的')
    console.log(this.cashArray);
  }

  changeSort(e: SortFile): void {
    this.message.info(`排序字段：${e.fileName},排序为:${e.sortDir}`);
  }

  // 修改一页几条
  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  initForm(): void {
    this.validateForm = this.fb.group({
      ruleName: [null],
      desc: [null],
    });
  }

  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: '文字很长',
          width: 130,
          field: 'productName',
          showSort: true,
        },
        {
          title: '换行',
          width: 100,
          field: 'casNo',
          notNeedEllipsis: true,
          showSort: true,
          tdClassList: ['text-wrap'],
        }, {
          title: '加样式',
          width: 100,
          field: 'productName',
          tdClassList: ['operate-text'],
        },
        {
          title: '名称',
          field: 'productName',
          tdTemplate: this.highLightTpl,
        },
        {
          title: '操作',
          tdTemplate: this.operationTpl,
          width: 80,
          fixed: true,
          fixedDir: "right"
        }
      ],
      total: 0,
      showCheckbox: true,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
    };
  }

  ngOnInit(): void {
    this.initForm();
    this.initTable();
  }
}
