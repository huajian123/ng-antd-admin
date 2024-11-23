import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, TemplateRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { fadeRouteAnimation } from '@app/animations/fade.animation';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { WaterMarkComponent } from '@shared/components/water-mark/water-mark.component';
import { SearchListStoreService } from '@store/biz-store-service/search-list/search-list-store.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

interface TabInterface {
  label: string;
  url: string;
}

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeRouteAnimation],
  standalone: true,
  imports: [PageHeaderComponent, WaterMarkComponent, NzButtonModule, NzInputModule, NzWaveModule, NzTabsModule, RouterOutlet]
})
export class SearchListComponent {
  @ViewChild('headerContent', { static: true }) headerContent!: TemplateRef<NzSafeAny>;
  @ViewChild('headerFooter', { static: true }) headerFooter!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '搜索列表（文章）',
    desc: this.headerContent,
    breadcrumb: ['首页', '列表页', '查询表格'],
    footer: this.headerFooter
  };
  currentSelTab = 0;
  destroyRef = inject(DestroyRef);
  tabData: TabInterface[] = [
    { label: '文章', url: '/default/page-demo/list/search-list/article' },
    { label: '项目', url: '/default/page-demo/list/search-list/project' },
    { label: '应用', url: '/default/page-demo/list/search-list/application' }
  ];
  private cdr = inject(ChangeDetectorRef);
  private searchListService = inject(SearchListStoreService);
  private router = inject(Router);

  constructor() {
    this.searchListService
      .getCurrentSearchListComponentStore()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(componentType => {
        this.pageHeaderInfo = {
          title: componentType,
          desc: this.headerContent,
          footer: this.headerFooter,
          breadcrumb: ['首页', '列表页', componentType]
        };
        this.cdr.markForCheck();
      });
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
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
}
