import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MyTableConfig, SortFile} from "@shared/components/ant-table/ant-table.component";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {SearchCommonVO} from "@core/services/types";

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeListComponent implements OnInit {
  @ViewChild('highLightTpl', {static: true}) highLightTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', {static: true}) operationTpl!: TemplateRef<NzSafeAny>;
  validateForm!: FormGroup;
  isCollapse = true;
  tableConfig!: MyTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '树状表格',
    // desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    breadcrumb: ['首页', '列表页', '树状表格']
  };
  cashArray: NzSafeAny[] = [];
  dataList: NzSafeAny[] = [];

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
    const params: SearchCommonVO<NzSafeAny> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex! || this.tableConfig.pageIndex!
    };
    this.dataList = [];
    this.tableConfig.loading = false;
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
  check(id: string): void {
    this.message.success(id);
  }

  /*重置*/
  resetForm(): void {
    this.validateForm.reset();
  }

  add(): void {

  }

  del(): void {
    if (this.cashArray.length === 0) {
      this.message.error('请勾选数据');
      return;
    }
    const temp: string[] = [];
    this.cashArray.forEach(item => {
      temp.push(item.id)
    })
    this.message.info('id数组(支持分页保存):' + JSON.stringify(temp))
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
          tdClassList: ['operate-text'],
        },
        {
          title: '性别',
          field: 'sex',
          width: 230,
          tdTemplate: this.highLightTpl,
        },
        {
          title: '年龄',
          field: 'age',
          width: 230,
          showSort: true,
        },
        {
          title: '住址',
          field: 'address',
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
