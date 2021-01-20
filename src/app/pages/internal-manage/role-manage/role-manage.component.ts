import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef} from '@angular/core';
import {MyTableConfig} from '../../../share/components/ant-table/ant-table.component';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {Role, SearchCommonVO} from '../../../core/services/types';
import {RoleService} from '../../../core/services/http/internal-manage/role.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {MessageService} from '../../../core/services/common/message.service';
import {InterAddEditService} from '../../../widget/biz-widget/internal-manage/inter-add-edit/inter-add-edit.service';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleManageComponent implements OnInit {
  @ViewChild('operationTpl', {static: true}) operationTpl!: TemplateRef<any>;

  tableConfig!: MyTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '查询表格',
    breadcrumb: ['首页', '内部管理', '角色管理']
  };
  dataList!: Role[];

  constructor(private dataService: RoleService, private modalSrv: NzModalService, private cdr: ChangeDetectorRef,
              private messageService: MessageService, private modalService: InterAddEditService) {
    this.dataList = [];
  }

  getDataList(e?: NzTableQueryParams): void {
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: this.tableConfig.pageSize!,
      pageNum: e?.pageIndex || this.tableConfig.pageIndex!
    };
    this.dataService.getRoles(params).subscribe((data => {
      const {list, total, pageNum} = data;
      this.dataList = [...list];
      this.tableConfig.total = total!;
      this.tableConfig.pageIndex = pageNum!;
      this.tableConfig.loading = false;
      this.cdr.markForCheck();
    }), (error => {
      console.log(1234);
      this.dataList=[...this.dataList]
      this.tableConfig.loading = false;
      this.cdr.markForCheck();
    }));
  }


  // 设置权限
  setRole(id: number): void {
    this.getDataList();
  }

  // 删除
  del(id: number): void {
    this.tableConfig.loading = true;
    this.dataService.delRoles(id).subscribe(() => {
      if (this.dataList.length === 1) {
        this.tableConfig.pageIndex--;
      }
      this.getDataList();
    });
  }

  add(): void {
    this.modalService.show({nzTitle: '新增'}).subscribe(({value}) => {
      this.tableConfig.loading = true;
      this.dataList = [...this.dataList];
      this.cdr.detectChanges();
      this.addEditData(value, 'addRoles');
    })
  }

  // 修改
  edit(id: number): void {
    this.dataService.getRolesDetail(id).subscribe(res => {
      this.modalService.show({nzTitle: '编辑'}, res).subscribe(({value}) => {
        value.id = id;
        this.tableConfig.loading = true;
        // 改变引用手动触发变更检测。
        this.dataList = [...this.dataList];
        this.cdr.detectChanges();
        this.addEditData(value, 'editRoles');
      })
    });
  }

  addEditData(param: Role, methodName: 'editRoles' | 'addRoles'): void {
    this.dataService[methodName](param).subscribe(() => {
      this.getDataList();
    });
  }

  // 修改一页几条
  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  private initTable(): void {
    this.tableConfig = {
      headers: [
        {
          title: '角色名称',
          field: 'roleName',
        },
        {
          title: '备注',
          field: 'roleDesc',
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
      pageIndex: 1,
    };
  }

  ngOnInit(): void {
    this.initTable();
  }
}
