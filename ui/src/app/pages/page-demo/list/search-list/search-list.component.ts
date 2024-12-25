import { Component, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef, inject, DestroyRef, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  imports: [PageHeaderComponent, WaterMarkComponent, NzButtonModule, NzInputModule, NzWaveModule, NzTabsModule, RouterOutlet]
})
export class SearchListComponent {
  readonly headerContent = viewChild.required<TemplateRef<NzSafeAny>>('headerContent');
  readonly headerFooter = viewChild.required<TemplateRef<NzSafeAny>>('headerFooter');
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '搜索列表（文章）',
    breadcrumb: ['首页', '列表页', '查询表格']
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
          desc: this.headerContent(),
          footer: this.headerFooter(),
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

  to(item: TabInterface): void {
    this.router.navigateByUrl(item.url);
  }
}
