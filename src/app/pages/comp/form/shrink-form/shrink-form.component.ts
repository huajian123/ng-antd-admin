import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NgIf } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

interface SearchParam {
  ruleName: number;
  desc: string;
}

@Component({
    selector: 'app-shrink-form',
    templateUrl: './shrink-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [PageHeaderComponent, NzCardModule, FormsModule, NzFormModule, NzGridModule, NzInputModule, NzButtonModule, NzWaveModule, NzIconModule, NgIf]
})
export class ShrinkFormComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '可折叠表单示例',
    breadcrumb: ['首页', '组件', 'Form', '可折叠表单'],
    desc: '可折叠表单'
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

  constructor() {}

  ngOnInit(): void {}
}
