import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

type componentName = '搜索列表（文章）' | '搜索列表（项目）' | '搜索列表（应用）';

// 这个是缓存搜索列表的store，属于业务的store
@Injectable({
  providedIn: 'root'
})
export class SearchListStoreService {
  private SearchListComponentStore = new Subject<componentName>();

  setCurrentSearchListComponentStore(componentName: componentName): void {
    this.SearchListComponentStore.next(componentName);
  }

  getCurrentSearchListComponentStore(): Observable<componentName> {
    return this.SearchListComponentStore.asObservable();
  }
}
