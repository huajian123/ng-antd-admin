import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {PageHeaderType} from '@shared/components/page-header/page-header.component';
import {SearchListStoreService} from '@store/biz-store-service/search-list/search-list-store.service';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterOutlet} from '@angular/router';
import {fadeRouteAnimation} from "@app/animations/fade.animation";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import { DestroyService } from '@core/services/common/destory.service';

interface TabInterface {
  label: string;
  url: string;
}

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeRouteAnimation
  ],
  providers: [DestroyService]
})
export class SearchListComponent implements OnInit {
  @ViewChild('headerContent', {static: true}) headerContent!: TemplateRef<NzSafeAny>;
  @ViewChild('headerFooter', {static: true}) headerFooter!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '搜索列表（文章）',
    desc: this.headerContent,
    breadcrumb: ['首页', '列表页', '查询表格'],
    footer: this.headerFooter
  };
  currentSelTab: number = 0;

  tabData: TabInterface[] = [
    {label: '文章', url: '/default/page-demo/list/search-list/article'},
    {label: '项目', url: '/default/page-demo/list/search-list/project'},
    {label: '应用', url: '/default/page-demo/list/search-list/application'},
  ];

  constructor(private searchListService: SearchListStoreService, private activatedRoute: ActivatedRoute,
              private destroy$: DestroyService,
              private router: Router, private cdr: ChangeDetectorRef) {
    this.searchListService.getCurrentSearchListComponentStore().pipe(takeUntil(this.destroy$)).subscribe(componentType => {
      this.pageHeaderInfo = {
        title: componentType,
        desc: this.headerContent,
        footer: this.headerFooter,
        breadcrumb: ['首页', '列表页', componentType]
      };
      this.cdr.markForCheck();
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe((event) => {
      if (event instanceof RouterEvent) {
        this.currentSelTab = this.tabData.findIndex(item => {
          return item.url === event.url;
        });
      }
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['key'];
  }

  to(item: TabInterface): void {
    this.router.navigateByUrl(item.url);
  }

  ngOnInit(): void {
  }
}
