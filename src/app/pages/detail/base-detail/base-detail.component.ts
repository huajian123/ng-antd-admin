import {Component, OnInit, ChangeDetectionStrategy, TemplateRef, ViewChild} from '@angular/core';
import {PageHeaderType} from '../../../shared/components/page-header/page-header.component';
import {MyTableConfig} from '../../../shared/components/ant-table/ant-table.component';

interface ReturnObj {
  num: string;
  name: string;
  code: string;
  unitPrice: string;
  number: string;
  price: string;
}

@Component({
  selector: 'app-base-detail',
  templateUrl: './base-detail.component.html',
  styleUrls: ['./base-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseDetailComponent implements OnInit {
  @ViewChild('returnProductTpl', {static: true}) returnProductTpl!: TemplateRef<any>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '基础详情页',
    breadcrumb: ['首页', '详情页', '基础详情页']
  };
  returnTableConfig!: MyTableConfig;
  returnTableConfig2!: MyTableConfig;
  returnDataList: ReturnObj[] = [{
    num: '1234561',
    name: '矿泉水 550ml',
    code: '12421432143214321',
    unitPrice: '2.00',
    number: '1',
    price: '2.00',
  }, {
    num: '1234561',
    name: '矿泉水 550ml',
    code: '12421432143214321',
    unitPrice: '2.00',
    number: '1',
    price: '2.00',
  }, {
    num: '1234561',
    name: '矿泉水 550ml',
    code: '12421432143214321',
    unitPrice: '2.00',
    number: '1',
    price: '2.00',
  }, {
    num: '1234561',
    name: '矿泉水 550ml',
    code: '12421432143214321',
    unitPrice: '2.00',
    number: '1',
    price: '2.00',
  }, {
    num: '1234561',
    name: '矿泉水 550ml',
    code: '12421432143214321',
    unitPrice: '2.00',
    number: '1',
    price: '2.00',
  }];

  constructor() {
  }

  private initReturnTable(): void {
    this.returnTableConfig = {
      showCheckbox: false,
      headers: [
        {
          title: '商品编号',
          field: 'num',
          width: 150,
          tdTemplate: this.returnProductTpl
        },
        {
          title: '商品名称',
          width: 160,
          field: 'name',
        },
        {
          title: '商品条码',
          width: 150,
          field: 'code',
        },
        {
          title: '单价',
          width: 150,
          field: 'unitPrice',
        },
        {
          title: '数量（件）',
          width: 150,
          field: 'number',
        },
        {
          title: '金额',
          field: 'price',
        },
      ],
      total: 0,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
    };
    this.returnTableConfig2 = {
      showCheckbox: false,
      headers: [
        {
          title: '商品编号',
          field: 'num',
          width: 150,
          tdTemplate: this.returnProductTpl
        },
        {
          title: '商品名称',
          width: 160,
          field: 'name',
        },
        {
          title: '商品条码',
          width: 150,
          field: 'code',
        },
        {
          title: '单价',
          width: 150,
          field: 'unitPrice',
        },
        {
          title: '数量（件）',
          width: 150,
          field: 'number',
        },
        {
          title: '金额',
          field: 'price',
        },
      ],
      total: 0,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
    };
  }


  ngOnInit(): void {
    this.initReturnTable();
  }

}
