import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NzFormTooltipIcon} from 'ng-zorro-antd/form';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {MyTableConfig} from '../../../share/components/ant-table/ant-table.component';
import {NzTableQueryParams} from 'ng-zorro-antd/table';
import {SearchCommonVO} from '../../../core/services/types';
import {ActionCode} from '../../../configs/actionCode';
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkbenchComponent implements OnInit,AfterViewInit {
  @ViewChild('pageHeaderContent', {static: false}) pageHeaderContent!: TemplateRef<any>
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    desc: ''
  };
  constructor(private fb: FormBuilder,public msg: NzMessageService) {
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: '工作台',
      breadcrumb: ['首页', 'Dashboard', '工作台'],
      desc: this.pageHeaderContent
    };
  }
}
