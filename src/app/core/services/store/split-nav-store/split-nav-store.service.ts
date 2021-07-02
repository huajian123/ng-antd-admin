import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Menu} from '../../types';

@Injectable({
  providedIn: 'root'
})
export class SplitNavStoreService {
  private splitLeftNavArray$ = new BehaviorSubject<Menu[]>([]);
  private splitTopNavArray$ = new BehaviorSubject<Menu[]>([]);

  constructor() {
  }

  setSplitLeftNavArrayStore(menu: Menu[]): void {
    this.splitLeftNavArray$.next(menu);
  }

  getSplitLeftNavArrayStore(): Observable<Menu[]> {
    return this.splitLeftNavArray$.asObservable();
  }


  setSplitTopNavArrayStore(menu: Menu[]): void {
    this.splitTopNavArray$.next(menu);
  }

  getSplitTopNavArrayStore(): Observable<Menu[]> {
    return this.splitTopNavArray$.asObservable();
  }
}
