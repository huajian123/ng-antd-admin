import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LockScreenFlag {
  locked: boolean;
  password: string;
  beforeLockPath: string;
}

/**
 * 锁屏状态service的store
 */
@Injectable({
  providedIn: 'root'
})
export class LockScreenStoreService {
  private lockScreenStore$ = new BehaviorSubject<LockScreenFlag>({ locked: false, password: '', beforeLockPath: '' });

  setLockScreenStore(store: LockScreenFlag): void {
    this.lockScreenStore$.next(store);
  }

  getLockScreenStore(): Observable<LockScreenFlag> {
    return this.lockScreenStore$.asObservable();
  }
}
