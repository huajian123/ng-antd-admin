import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, ViewChild, TemplateRef} from '@angular/core';
import {PageHeaderType} from '../../../share/components/page-header/page-header.component';
import {SearchListService} from '../../../core/services/store/biz-store-service/search-list/search-list.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  private destory$ = new Subject<void>();

  constructor(private searchListService: SearchListService, private cdr: ChangeDetectorRef) {
    this.searchListService.getCurrentSearchListComponentStore().pipe(takeUntil(this.destory$)).subscribe(componentType => {
      this.pageHeaderInfo = {
        title: componentType,
        desc: this.headerContent,
        footer: this.headerFooter,
        breadcrumb: ['首页', '列表页', componentType]
      };
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
