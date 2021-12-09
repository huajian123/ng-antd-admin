import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {PageHeaderType} from '../../../shared/components/page-header/page-header.component';
import {SearchListService} from '../../../core/services/store/biz-store-service/search-list/search-list.service';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterOutlet} from '@angular/router';
import {fadeRouteAnimation} from "../../../animations/fade.animation";

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
  ]
})
export class SearchListComponent implements OnInit, OnDestroy {
  @ViewChild('headerContent', {static: true}) headerContent!: TemplateRef<any>;
  @ViewChild('headerFooter', {static: true}) headerFooter!: TemplateRef<any>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '搜索列表（文章）',
    desc: this.headerContent,
    breadcrumb: ['首页', '列表页', '查询表格'],
    footer: this.headerFooter
  };
  currentSelTab: number = 0;

  private destory$ = new Subject<void>();
  tabData: TabInterface[] = [
    {label: '文章', url: '/default/list/search-list/article'},
    {label: '项目', url: '/default/list/search-list/project'},
    {label: '应用', url: '/default/list/search-list/application'},
  ];

  constructor(private searchListService: SearchListService, private activatedRoute: ActivatedRoute,
              private router: Router, private cdr: ChangeDetectorRef) {
    this.searchListService.getCurrentSearchListComponentStore().pipe(takeUntil(this.destory$)).subscribe(componentType => {
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
    return outlet?.activatedRouteData?.key;
  }

  to(item: TabInterface): void {
    this.router.navigateByUrl(item.url);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
