import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { AntTableConfig } from '@shared/components/ant-table/ant-table.component';
import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

interface ReturnObj {
  num: string;
  name: string;
  code: string;
  unitPrice: number;
  number: string;
  price: string;
}

enum TabEnum {
  Detail,
  Rule
}

@Component({
  selector: 'app-adv-detail',
  templateUrl: './adv-detail.component.html',
  styleUrls: ['./adv-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('headerExtra', { static: false }) headerExtra!: TemplateRef<NzSafeAny>;
  @ViewChild('headerContent', { static: false }) headerContent!: TemplateRef<NzSafeAny>;
  @ViewChild('headerFooter', { static: false }) headerFooter!: TemplateRef<NzSafeAny>;
  @ViewChild('highLightTpl', { static: true }) highLightTpl!: TemplateRef<NzSafeAny>;
  stepDirection: 'horizontal' | 'vertical' = 'horizontal';
  returnTableConfig!: AntTableConfig;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: ''
  };
  tabEnum = TabEnum;
  currentSelTab: number = this.tabEnum.Detail;

  returnDataList: ReturnObj[] = [
    {
      num: '1234561',
      name: '矿泉水 550ml',
      code: '演示作用域',
      unitPrice: 1233333,
      number: '1',
      price: '2.00'
    },
    {
      num: '1234561',
      name: '矿泉水 550ml',
      code: '演示作用域',
      unitPrice: 1233333,
      number: '1',
      price: '2.00'
    },
    {
      num: '1234561',
      name: '矿泉水 550ml',
      code: '演示作用域',
      unitPrice: 1233333,
      number: '1',
      price: '2.00'
    },
    {
      num: '1234561',
      name: '矿泉水 550ml',
      code: '演示作用域',
      unitPrice: 1233333,
      number: '1',
      price: '2.00'
    },
    {
      num: '1234561',
      name: '矿泉水 550ml',
      code: '演示作用域',
      unitPrice: 1233333,
      number: '1',
      price: '2.00'
    }
  ];

  constructor(private cdr: ChangeDetectorRef, private breakpointObserver: BreakpointObserver) {}

  to(tabIndex: TabEnum): void {
    this.currentSelTab = tabIndex;
    this.cdr.detectChanges();
  }

  private initReturnTable(): void {
    this.returnTableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: '操作类型',
          field: 'num',
          width: 50
        },
        {
          title: '操作人',
          width: 60,
          field: 'name'
        },
        {
          title: '执行结果',
          width: 50,
          field: 'code',
          tdTemplate: this.highLightTpl
        },
        {
          title: '操作时间',
          width: 50,
          field: 'unitPrice',
          pipe: 'date:yyyy-MM-dd HH:mm'
        },
        {
          title: '备注',
          width: 50,
          field: 'number'
        }
      ],
      xScroll: 500,
      total: 0,
      loading: false,
      pageSize: 10,
      pageIndex: 1
    };
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 770px)']).subscribe(result => {
      if (result.matches) {
        this.stepDirection = 'vertical';
      } else {
        this.stepDirection = 'horizontal';
      }
    });
    this.initReturnTable();
  }

  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: '单号：234231029431',
      breadcrumb: ['首页', '详情页', '高级详情页'],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: this.headerFooter
    };
  }
}
