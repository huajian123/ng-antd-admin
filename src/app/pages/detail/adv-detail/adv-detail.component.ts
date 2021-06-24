import {Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, AfterViewInit} from '@angular/core';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {inNextTick} from 'ng-zorro-antd/core/util';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-adv-detail',
  templateUrl: './adv-detail.component.html',
  styleUrls: ['./adv-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('headerExtra', {static: false}) headerExtra!: TemplateRef<any>;
  @ViewChild('headerContent', {static: false}) headerContent!: TemplateRef<any>;
  @ViewChild('headerFooter', {static: false}) headerFooter!: TemplateRef<any>;
  stepDirection: 'horizontal' | 'vertical' = 'horizontal';
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '',
    breadcrumb: [],
    extra: '',
    desc: '',
    footer: '',
  };

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 770px)']).subscribe(result => {
      if (result.matches) {
        this.stepDirection = 'vertical';
      } else {
        this.stepDirection = 'horizontal';
      }
    });
  }

  ngAfterViewInit(): void {
    this.pageHeaderInfo = {
      title: '单号：234231029431',
      breadcrumb: ['首页', '详情页', '高级详情页'],
      extra: this.headerExtra,
      desc: this.headerContent,
      footer: this.headerFooter,
    };
  }

}
