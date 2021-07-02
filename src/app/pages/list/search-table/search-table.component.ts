import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyTableConfig} from '../../../share/components/ant-table/ant-table.component';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {ActionCode} from '../../../configs/actionCode';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {SearchCommonVO} from '../../../core/services/types';
import {Router} from '@angular/router';

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
    title: '查询表格',
    // desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    breadcrumb: ['首页', '列表页', '查询表格']
  };
  dataList!: any[];
  actionCodeObj = {
    add: ActionCode.RoleAdd
  };

  constructor(private fb: FormBuilder, private router: Router) {
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
        productName: '文字超级长文字超级长文字超级长文字超级长文字超级长文字超级长',
        casNo: '没有省略号没有省略号没有省略号没有省略号没有省略号没有省略号没有省略号没有省略号',
        file3: '加样式'
      },
      {
        productName: '文字超级长文字超级长文字超级长文字超级长文字超级长文字超级长',
        casNo: 'string',
        file3: '加样式',
      },
      {
        productName: 'string',
        casNo: 'string',
        file3: '加样式',
      },
      {
        productName: 'string',
        casNo: 'string',
        file3: '加样式',
      },
      {
        productName: 'string',
        casNo: 'string',
        file3: '加样式',
      },
      {
        productName: 'string',
        casNo: 'string',
        file3: '加样式',
      },
    ];
    this.tableConfig.total = 13;
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

  /*新增*/
  addRow(): void {
  }

  /*查看*/
  check(name: string): void {
    //skipLocationChange导航时不要把新状态记入历史时设置为true
    this.router.navigate(['default/list/search-table/search-table-detail'], {queryParams: {name}, skipLocationChange: true});
  }

  /*重置*/
  resetForm(): void {
    this.validateForm.reset();
  }

  add(): void {
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
          width: 100,
          field: 'productName',
        },
        {
          title: '换行',
          width: 100,
          field: 'casNo',
          notNeedEllipsis: true,
          tdClassList: ['text-wrap'],
        }, {
          title: '加样式',
          width: 100,
          field: 'productName',
          tdClassList: ['operate-text'],
        },
        {
          title: '名称',
          width: 100,
          field: 'productName',
          tdTemplate: this.highLightTpl,
        },
        {
          title: '操作',
          tdTemplate: this.operationTpl,
          width: 150,
          fixed: true
        }
      ],
      total: 0,
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
