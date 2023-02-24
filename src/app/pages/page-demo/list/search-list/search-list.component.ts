import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';

import { fadeRouteAnimation } from '@app/animations/fade.animation';
import { DestroyService } from '@core/services/common/destory.service';
import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { SearchListStoreService } from '@store/biz-store-service/search-list/search-list-store.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NgFor } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { WaterMarkComponent } from '../../../../shared/components/water-mark/water-mark.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

interface TabInterface {
  label: string;
  url: string;
}

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [fadeRouteAnimation],
    providers: [DestroyService],
    standalone: true,
    imports: [PageHeaderComponent, WaterMarkComponent, NzButtonModule, NzInputModule, NzWaveModule, NzTabsModule, NgFor, RouterOutlet]
})
export class SearchListComponent implements OnInit {
  @ViewChild('headerContent', { static: true }) headerContent!: TemplateRef<NzSafeAny>;
  @ViewChild('headerFooter', { static: true }) headerFooter!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '搜索列表（文章）',
    desc: this.headerContent,
    breadcrumb: ['首页', '列表页', '查询表格'],
    footer: this.headerFooter
  };
  currentSelTab: number = 0;

  tabData: TabInterface[] = [
    { label: '文章', url: '/default/page-demo/list/search-list/article' },
    { label: '项目', url: '/default/page-demo/list/search-list/project' },
    { label: '应用', url: '/default/page-demo/list/search-list/application' }
  ];

  constructor(private searchListService: SearchListStoreService, private activatedRoute: ActivatedRoute, private destroy$: DestroyService, private router: Router, private cdr: ChangeDetectorRef) {
    this.searchListService
      .getCurrentSearchListComponentStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe(componentType => {
        this.pageHeaderInfo = {
          title: componentType,
          desc: this.headerContent,
          footer: this.headerFooter,
          breadcrumb: ['首页', '列表页', componentType]
        };
        this.cdr.markForCheck();
      });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      if (event instanceof RouterEvent) {
        this.currentSelTab = this.tabData.findIndex(item => {
          return item.url === event.url;
        });
      }
    });
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.['key'];
  }

  to(item: TabInterface): void {
    this.router.navigateByUrl(item.url);
  }

  ngOnInit(): void {}
}
