import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MyTableConfig} from '../../../share/components/ant-table/ant-table.component';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {SearchCommonVO} from '../../../core/services/types';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleManageComponent implements OnInit {

  @ViewChild('operationTpl', {static: true}) operationTpl!: TemplateRef<any>;
  validateForm!: FormGroup;
  isCollapse = true;
  tableConfig!: MyTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '查询表格',
    // desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    breadcrumb: ['首页', '表单页', '基础表单']
  };
  dataList!: any[];

  constructor(private fb: FormBuilder) {
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
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
      },
      {
        productName: 'string',
        casNo: 'string',
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

  /*新增*/
  check(name: string): void {
    console.log(name);
  }

  /*重置*/
  resetForm(): void {
    this.validateForm.reset();
  }

  add(): void {
    console.log(123);
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
          title: '年龄',
          width: 100,
          field: 'productName',
        },
        {
          title: '名称',
          width: 100,
          field: 'productName',
        }, {
          title: '年龄',
          width: 100,
          field: 'productName',
        },
        {
          title: '名称',
          width: 100,
          field: 'productName',
        },
        {
          title: '年龄',
          width: 100,
          field: 'productName',
        },
        {
          title: '名称',
          width: 100,
          field: 'productName',
        }, {
          title: '年龄',
          width: 100,
          field: 'productName',
        },
        {
          title: '名称',
          width: 100,
          field: 'productName',
        },
        {
          title: '名称',
          width: 100,
          field: 'productName',
        },
        {
          title: '名称',
          width: 100,
          field: 'productName',
        },
        {
          title: '名称',
          width: 100,
          field: 'productName',
        },
        {
          title: '名称',
          width: 100,
          field: 'productName',
        },
        {
          title: '名称',
          width: 100,
          field: 'productName',
          fixed: true
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
