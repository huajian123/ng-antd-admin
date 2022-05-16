import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef} from '@angular/core';
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {MyTableConfig} from "@shared/components/ant-table/ant-table.component";
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {FormBuilder} from "@angular/forms";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {OptionsInterface, SearchCommonVO} from "@core/services/types";
import {MenuListObj, MenusService} from "@services/system/menus.service";
import {finalize} from "rxjs/operators";
import {fnFlatDataHasParentToTree, fnFlattenTreeDataByDataList} from "@utils/treeTableTools";
import {TreeNodeInterface} from "@shared/components/tree-table/tree-table.component";
import {MenuModalService} from "@widget/biz-widget/system/menu-modal/menu-modal.service";
import {ModalBtnStatus} from "@widget/base-modal";
import {MapKeyType, MapPipe, MapSet} from "@shared/pipes/map.pipe";
import { ActionCode } from '@app/config/actionCode';


interface SearchParam {
  menuName: number;
  visible: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  @ViewChild('zorroIconTpl', {static: true}) zorroIconTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('aliIconTpl', {static: true}) aliIconTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('operationTpl', {static: true}) operationTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('visibleTpl', {static: true}) visibleTpl!: TemplateRef<NzSafeAny>;
  @ViewChild('newLinkFlag', {static: true}) newLinkFlag!: TemplateRef<NzSafeAny>;

  ActionCode = ActionCode;
  searchParam: Partial<SearchParam> = {};

  tableConfig!: MyTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '菜单管理',
    breadcrumb: ['首页', '系统管理', '菜单管理']
  };
  dataList: TreeNodeInterface[] = [];
  visibleOptions: OptionsInterface[] = [];


  constructor(private fb: FormBuilder,
              private menuModalService: MenuModalService,
              private dataService: MenusService,
              private modalSrv: NzModalService,
              public message: NzMessageService,
              private router: Router, private cdr: ChangeDetectorRef) {
  }

  reloadTable(): void {
    this.message.info('已经刷新了')
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
    this.tableConfig.loading = true;
    const params: SearchCommonVO<any> = {
      pageSize: 0,
      pageNum: 0,
      filters: this.searchParam
    };
    this.dataService.getMenuList(params).pipe(finalize(() => {
      this.tableLoading(false);
    })).subscribe((menuList => {
      const target = fnFlatDataHasParentToTree(menuList.list,"fatherId");
      this.dataList = fnFlattenTreeDataByDataList(target);
      this.tableLoading(false);
    }));
  }

  /*重置*/
  resetForm(): void {
    this.searchParam = {};
    this.getDataList();
  }

  add(fatherId: number): void {
    this.menuModalService.show({nzTitle: '新增'}).subscribe((res) => {
      if (!res || res.status === ModalBtnStatus.Cancel) {
        return;
      }
      const param = {...res.modalValue};
      param.fatherId = fatherId;
      this.tableLoading(true);
      this.addEditData(param, 'addMenus');
    }, error => this.tableLoading(false));
  }

  addEditData(param: MenuListObj, methodName: 'editMenus' | 'addMenus'): void {
    this.dataService[methodName](param).pipe(finalize(() => {
      this.tableLoading(false);
    })).subscribe(() => {
      this.getDataList();
    });
  }

  del(id: number): void {
    this.modalSrv.confirm({
      nzTitle: '确定要删除吗？',
      nzContent: '删除后不可恢复',
      nzOnOk: () => {
        this.tableLoading(true);
        this.dataService.delMenus(id).subscribe(() => {
          if (this.dataList.length === 1) {
            this.tableConfig.pageIndex--;
          }
          this.getDataList();
        }, error => this.tableLoading(false));
      }
    });
  }

  // 修改
  edit(id: number, fatherId: number): void {
    this.dataService.getMenuDetail(id).subscribe(res => {
      this.menuModalService.show({nzTitle: '编辑'}, res).subscribe(({modalValue, status}) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        modalValue.id = id;
        modalValue.fatherId = fatherId;
        this.tableLoading(true);
        this.addEditData(modalValue, 'editMenus');
      }, error => this.tableLoading(false));
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
          title: '菜单名称',
          width: 230,
          field: 'menuName',
        },
        {
          title: 'zorro图标',
          field: 'icon',
          width: 100,
          tdTemplate: this.zorroIconTpl,
        },
        {
          title: '阿里图标',
          field: 'alIcon',
          width: 100,
          tdTemplate: this.aliIconTpl,
        },
        {
          title: '权限码',
          field: 'code',
          width: 300,
        },
        {
          title: '路由地址',
          field: 'path',
          width:300
        },
        {
          title: '排序',
          field: 'orderNum',
          width: 80,
        },
        {
          title: '状态',
          field: 'status',
          pipe: 'available',
          width: 100,
        },
        {
          title: '展示',
          field: 'visible',
          pipe: 'isOrNot',
          tdTemplate:this.visibleTpl,
          width: 100,
        },
        {
          title: '外链',
          field: 'newLinkFlag',
          pipe: 'isOrNot',
          tdTemplate:this.newLinkFlag,
          width: 100,
        },
        {
          title: '创建时间',
          field: 'createTime',
          pipe: 'date:yyyy-MM-dd HH:mm',
          width: 180,
        },
        {
          title: '操作',
          tdTemplate: this.operationTpl,
          width: 180,
          fixed: false,
          fixedDir: "right"
        }
      ],
      total: 0,
      showCheckbox: false,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
    };
  }

  ngOnInit(): void {
    this.initTable();
    this.visibleOptions = [...MapPipe.transformMapToArray(MapSet.visible, MapKeyType.Boolean)];
  }
}
