import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation, collapseAnimation, rubberBandAnimation } from 'angular-animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

import { DemoDynamicParamsComponent } from './demo-dynamic-params/demo-dynamic-params.component';
import { DemoMainComponent } from './demo-main/demo-main.component';
import { DemoOnEnterOnLeaveComponent } from './demo-on-enter-on-leave/demo-on-enter-on-leave.component';
import { ExperimentsComponent } from './experiments/experiments.component';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOnEnterAnimation(), fadeOutOnLeaveAnimation(), rubberBandAnimation(), collapseAnimation()],
  standalone: true,
  imports: [PageHeaderComponent, NzButtonModule, NzWaveModule, NzCardModule, DemoMainComponent, DemoOnEnterOnLeaveComponent, DemoDynamicParamsComponent, ExperimentsComponent]
})
export class TransitionComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '动画组件示例',
    desc: '动起来！',
    breadcrumb: ['首页', '组件', '动画组件']
  };
  currentComp = 'home';
}
