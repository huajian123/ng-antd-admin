import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

import { DemoCssTransitionComponent } from './demo-css-transition/demo-css-transition.component';
import { DemoEnterLeaveComponent } from './demo-enter-leave/demo-enter-leave.component';
import { DemoStaggerComponent } from './demo-stagger/demo-stagger.component';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzButtonModule, NzWaveModule, NzCardModule, NzTabsModule, DemoCssTransitionComponent, DemoEnterLeaveComponent, DemoStaggerComponent]
})
export class TransitionComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '动画示例',
    desc: 'https://angular.dev/guide/animations/migration 基于 CSS 原生动画的 Angular 官方推荐方式，旧版本@angular/animations 被标记为弃用，它的animations动画，请参考v20及以下版本的示例代码，还是很丰富的',
    breadcrumb: ['首页', '组件', '动画']
  };
}
