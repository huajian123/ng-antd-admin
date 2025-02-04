import { Injectable, signal } from '@angular/core';

import { Menu } from '@core/services/types';

// 菜单store service
@Injectable({
  providedIn: 'root'
})
export class MenuStoreService {
  $menuArray = signal<Menu[]>([]);
  // private menuArray$ = new BehaviorSubject<Menu[]>([]);
  //
  // setMenuArrayStore(menuArray: Menu[]): void {
  //   this.menuArray$.next(menuArray);
  // }
  //
  // getMenuArrayStore(): Observable<Menu[]> {
  //   return this.menuArray$.asObservable();
  // }
}
