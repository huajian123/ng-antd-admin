import { Component, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';

interface DetailFormModel {
  userName: string;
}

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-search-table-detail',
  templateUrl: './search-table-detail.component.html',

  imports: [PageHeaderComponent, NzInputModule, FormField, NzDividerModule, NzFormModule, NzGridModule]
})
export class SearchTableDetailComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '详情',
    // desc: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    breadcrumb: ['首页', '列表页', '查询表格', '详情']
  };
  formModel = signal<DetailFormModel>({
    userName: ''
  });
  validateForm = form(this.formModel, schemaPath => {
    required(schemaPath.userName, { message: '请输入用户名' });
  });
  name = input.required<string>(); // 从路由中获取的参数，ng16支持的新特性
  backUrl = '/default/page-demo/list/search-table';
  destroyRef = inject(DestroyRef);

  submitForm(): void {
    if (this.validateForm().invalid()) {
      // 标记所有字段为 touched，使验证错误提示显示
      this.validateForm().markAsTouched();
      return;
    }
    console.log('表单数据:', this.formModel());
  }

  _onReuseDestroy(): void {
    console.log('tab销毁了，调用_OnReuseDestroy');
  }

  ngOnInit(): void {
    this.formModel.set({ userName: this.name() });
  }
}
