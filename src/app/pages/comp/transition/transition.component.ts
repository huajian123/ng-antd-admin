import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {
  fadeInOnEnterAnimation,
  fadeOutOnLeaveAnimation,
  collapseAnimation,
  rubberBandAnimation
} from 'angular-animations';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation(),
    rubberBandAnimation(),
    collapseAnimation(),
  ]
})
export class TransitionComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '动画组件示例',
    desc: '动起来！',
    breadcrumb: ['首页', '组件', '动画组件'],
  };
  currentComp = 'home';

  constructor() {
  }

  ngOnInit(): void {
  }

}
