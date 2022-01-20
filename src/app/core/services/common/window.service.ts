import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  alert(message: string): void {
    if (this.isBrowser) {
      alert(message);
    }
  }

  confirm(message: string): boolean {
    if (this.isBrowser) {
      return window.confirm(message);
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
