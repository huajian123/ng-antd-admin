import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyTableConfig} from '../../../share/components/ant-table/ant-table.component';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {Role, SearchCommonVO} from '../../../core/services/types';
import {RoleService} from '../../../core/services/http/internal-manage/role.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {fnCheckForm} from '../../../utils/tools';
import {MessageService} from '../../../core/services/common/message.service';


@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleManageComponent implements OnInit {
  @ViewChild('operationTpl', {static: true}) operationTpl!: TemplateRef<any>;
  addEditForm!: FormGroup;
  tableConfig!: MyTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '查询表格',
    breadcrumb: ['首页', '内部管理', '角色管理']
  };
  dataList!: Role[];

  constructor(private fb: FormBuilder, private dataService: RoleService,
              private modalSrv: NzModalService, private cdr: ChangeDetectorRef, private messageService: MessageService) {
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
    }));
  }

  add(tpl: TemplateRef<{}>): void {
    this.addEditForm.reset();
    this.modalSrv.create({
      nzTitle: '新建角色',
      nzContent: tpl,
      nzOnOk: () => {
        if (!fnCheckForm(this.addEditForm)) {
          return false;
        }
        this.addData(this.addEditForm.value);
        return true;
      },
    });
  }

  // 设置权限
  setRole(id: number): void {
    console.log(id);
  }

  // 删除
  del(id: number): void {
    this.dataService.delRoles(id).subscribe(() => {
      if (this.dataList.length === 1) {
        this.tableConfig.pageIndex--;
      }
      this.getDataList();
    });
  }

  // 修改
  edit(id: number, tpl: TemplateRef<{}>): void {
    const dataDetail = this.dataService.getRolesDetail(id);
    dataDetail.subscribe(res => {
      this.addEditForm.patchValue(res);
      this.modalSrv.create({
        nzTitle: '修改角色',
        nzContent: tpl,
        nzOnOk: () => {
          if (!fnCheckForm(this.addEditForm)) {
            return false;
          }
          const param = this.addEditForm.value;
          param.id = id;
          this.editData(param);
          return true;
        },
      });
    });
  }

  editData(param: Role): void {
    this.dataService.editRoles(param).subscribe(res => {
      this.getDataList();
    });
  }

  addData(param: Role): void {
    this.dataService.addRoles(param).subscribe(res => {
      this.getDataList();
    });
  }

  // 修改一页几条
  changePageSize(e: number): void {
    this.tableConfig.pageSize = e;
  }

  initForm(): void {
    this.addEditForm = this.fb.group({
      roleName: [null, [Validators.required]],
      roleDesc: [null],
    });
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
    this.initForm();
    this.initTable();
  }
}
