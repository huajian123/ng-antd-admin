import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { RippleDirective } from '@shared/directives/ripple.directive';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-ripple',
  templateUrl: './ripple.component.html',
  styleUrl: './ripple.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzCardModule, NzCheckboxModule, NzIconModule, FormsModule, RippleDirective]
})
export class RippleComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '水波纹',
    breadcrumb: ['首页', '功能', '水波纹'],
    desc: '另一个做法是引入material里面的MatRipple，我嫌弃不应该引入第二个组件库，这里手写了。本项目历史版本在v20以及以下版本有演示'
  };
  disabled = signal(false);
  unbounded = signal(false);
  color = signal('rgba(0,0,0,0.15)');
}
