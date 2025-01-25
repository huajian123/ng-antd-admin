import { Injectable, signal } from '@angular/core';

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
  lockScreenSignalStore = signal<LockScreenFlag>({ locked: false, password: '', beforeLockPath: '' });
}
