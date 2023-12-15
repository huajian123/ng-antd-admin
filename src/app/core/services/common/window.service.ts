import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

const WINDOW_TOKEN = new InjectionToken<Window>('A reference to the window object', {
  factory: () => window
});

/*window对象封装服务*/
@Injectable({
  providedIn: 'root'
})
export class WindowService {
  private readonly isBrowser: boolean;
  private readonly platformId = inject(PLATFORM_ID);
  private readonly window = inject(WINDOW_TOKEN);

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  alert(message: string): void {
    if (this.isBrowser) {
      alert(message);
    }
  }

  confirm(message: string): boolean {
    if (this.isBrowser) {
      return this.window.confirm(message);
    }
    return false;
  }

  setStorage(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  getStorage(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  removeStorage(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  clearStorage(): void {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }

  setSessionStorage(key: string, value: string): void {
    if (this.isBrowser) {
      sessionStorage.setItem(key, value);
    }
  }

  getSessionStorage(key: string): string | null {
    if (this.isBrowser) {
      return sessionStorage.getItem(key);
    }
    return null;
  }

  removeSessionStorage(key: string): void {
    if (this.isBrowser) {
      sessionStorage.removeItem(key);
    }
  }

  clearSessionStorage(): void {
    if (this.isBrowser) {
      sessionStorage.clear();
    }
  }
}
