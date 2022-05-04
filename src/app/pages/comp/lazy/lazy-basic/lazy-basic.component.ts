import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {AdDirective} from "@shared/directives/ad.directive";
import {LazyServiceService} from "@app/pages/comp/lazy/lazy-service.service";

@Component({
  selector: 'app-lazy-basic',
  templateUrl: './lazy-basic.component.html',
  styleUrls: ['./lazy-basic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LazyServiceService]
})
export class LazyBasicComponent implements OnInit, AfterViewInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '懒加载组件示例',
    breadcrumb: ['首页', '组件', '懒加载组件'],
    desc: '懒加载组件,我永远喜欢周杰伦'
  };
  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;
  isStarted = false;

  constructor(public lazyServiceService: LazyServiceService) {
  }

  ngAfterViewInit(): void {
    this.lazyServiceService.adHost = this.adHost;
  }

  ngOnInit(): void {
  }

}
