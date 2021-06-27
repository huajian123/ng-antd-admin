import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchListService {
  private SearchListComponentStore = new Subject<'搜索列表（文章）' | '搜索列表（项目）' | '搜索列表（应用）'>();

  constructor() {
  }

  setCurrentSearchListComponentStore(componentName: '搜索列表（文章）' | '搜索列表（项目）' | '搜索列表（应用）'): void {
    this.SearchListComponentStore.next(componentName);
  }
  getCurrentSearchListComponentStore(): Observable<'搜索列表（文章）' | '搜索列表（项目）' | '搜索列表（应用）'> {
    return this.SearchListComponentStore.asObservable();
  }
}
