import { Injectable, signal } from '@angular/core';

import { Menu } from '../../types';

/**
 * 自动分割菜单时，左侧菜单的store
 */
@Injectable({
  providedIn: 'root'
})
export class SplitNavStoreService {
  $splitLeftNavArray = signal<Menu[]>([]);
}
