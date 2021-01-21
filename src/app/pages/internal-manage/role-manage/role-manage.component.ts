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
      this.tableConfig.loading = false;
      this.tableChangeDectction();
    }));
  }


  // 设置权限
  setRole(id: number): void {
    this.getDataList();
  }

  // 触发表格变更检测
  tableChangeDectction(): void {
    // 改变引用触发变更检测。
    this.dataList = [...this.dataList];
    this.cdr.detectChanges();
  }

  // 删除
  del(id: number): void {
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '删除后不可恢复',
      nzOnOk: () => {
        this.tableConfig.loading = true;
        this.tableChangeDectction();
        this.dataService.delRoles(id).subscribe(() => {
          if (this.dataList.length === 1) {
            this.tableConfig.pageIndex--;
          }
          this.getDataList();
        });
      }
    });
  }

  add(): void {
    this.modalService.show({nzTitle: '新增'}).then(({value}) => {
      this.tableConfig.loading = true;
      this.tableChangeDectction();
      this.addEditData(value, 'addRoles');
    }).catch(e => {
      this.tableConfig.loading = false;
      this.tableChangeDectction();
    });
  }

  // 修改
  edit(id: number): void {
    this.dataService.getRolesDetail(id).subscribe(res => {
      this.modalService.show({nzTitle: '编辑'}, res).then(({value}) => {
        value.id = id;
        this.tableConfig.loading = true;
        this.tableChangeDectction();
        this.addEditData(value, 'editRoles');
      }).catch(e => {
      });
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
