import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, FormsModule, NzFormModule, NzGridModule, NzInputModule, NzButtonModule, NzWaveModule, NzIconModule]
})
export class ShrinkFormComponent {
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
}
