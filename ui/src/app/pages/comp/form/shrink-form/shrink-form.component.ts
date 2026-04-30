import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

interface SearchParam {
  ruleName: number;
  desc: string;
}

@Component({
  selector: 'app-shrink-form',
  templateUrl: './shrink-form.component.html',
  styleUrl: './shrink-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzCardModule, FormsModule, NzFormModule, NzGridModule, NzInputModule, NzButtonModule, NzIconModule]
})
export class ShrinkFormComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '可折叠搜索表单',
    breadcrumb: ['首页', '组件', 'Form', '可折叠表单'],
    desc: '支持展开/收起的搜索表单，适合字段较多的查询场景'
  };

  searchParam: Partial<SearchParam> = {};

  isCollapse = true;

  /*重置*/
  resetForm(): void {
    this.searchParam = {};
  }

  /*展开*/
  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }
}
