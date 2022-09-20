/* eslint-disable prettier/prettier */
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

type componentName = '搜索列表（文章）' | '搜索列表（项目）' | '搜索列表（应用）';

@Injectable({
  providedIn: 'root'
})
export class SearchListStoreService {
  private SearchListComponentStore = new Subject<componentName>();

  constructor() {}

  setCurrentSearchListComponentStore(componentName: componentName): void {
    this.SearchListComponentStore.next(componentName);
  }

  getCurrentSearchListComponentStore(): Observable<componentName> {
    return this.SearchListComponentStore.asObservable();
  }
}
