import { Injectable, signal } from '@angular/core';

type componentName = '搜索列表（文章）' | '搜索列表（项目）' | '搜索列表（应用）';

/**
 * 这个是缓存搜索列表的store，属于业务的store
 */
@Injectable({
  providedIn: 'root'
})
export class SearchListStoreService {
  $searchListComponentStore = signal<componentName>('搜索列表（文章）');
}
