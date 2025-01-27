import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, TemplateRef, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
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

  pageHeaderInfo = computed<Partial<PageHeaderType>>(() => {
    return {
      title: this.searchListService.$searchListComponentStore(),
      desc: this.headerContent(),
      footer: this.headerFooter(),
      breadcrumb: ['首页', '列表页', this.searchListService.$searchListComponentStore()]
    };
  });
  currentSelTab = 0;
  destroyRef = inject(DestroyRef);
  tabData: TabInterface[] = [
    { label: '文章', url: '/default/page-demo/list/search-list/article' },
    { label: '项目', url: '/default/page-demo/list/search-list/project' },
    { label: '应用', url: '/default/page-demo/list/search-list/application' }
  ];
  private searchListService = inject(SearchListStoreService);
  private router = inject(Router);

  constructor() {
    // todo 好像第一次路由结束以后不会执行，导致刷新的时候tab的索引错乱
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
