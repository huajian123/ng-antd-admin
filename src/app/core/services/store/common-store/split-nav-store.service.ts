import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Menu } from '../../types';

// 自动分割菜单时，左侧菜单的store
@Injectable({
  providedIn: 'root'
})
export class SplitNavStoreService {
  private splitLeftNavArray$ = new BehaviorSubject<Menu[]>([]);

  constructor() {}

  setSplitLeftNavArrayStore(menu: Menu[]): void {
    this.splitLeftNavArray$.next(menu);
  }

  getSplitLeftNavArrayStore(): Observable<Menu[]> {
    return this.splitLeftNavArray$.asObservable();
  }
}
