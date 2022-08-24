import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface LockScreenFlag {
  locked: boolean;
  password: string;
  beforeLockPath: string;
}

@Injectable({
  providedIn: 'root'
})
export class LockScreenStoreService {
  private lockScreenStore$ = new BehaviorSubject<LockScreenFlag>({ locked: false, password: '', beforeLockPath: '' });

  constructor() {}

  setLockScreenStore(store: LockScreenFlag): void {
    this.lockScreenStore$.next(store);
  }

  getLockScreenStore(): Observable<LockScreenFlag> {
    return this.lockScreenStore$.asObservable();
  }
}
