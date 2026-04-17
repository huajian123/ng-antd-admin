import { Injectable, signal } from '@angular/core';

import { Menu } from '@core/services/types';

// 菜单store service
@Injectable({
  providedIn: 'root'
})
export class MenuStoreService {
  $menuArray = signal<Menu[]>([]);

  setMenuArrayStore(menuArray: Menu[]): void {
    this.$menuArray.set(menuArray);
  }
}
