import { Injectable } from '@angular/core';
import {ServicesModule} from './services.module';
import {BehaviorSubject, Observable} from 'rxjs';
export interface SettingInterface {
  theme: 'dark'|'light'|'night';
  color: string;
  mode: string;
  fixedWidth: boolean;
  colorWeak: boolean;
}



@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themesMode$ = new BehaviorSubject<SettingInterface>({
    theme: 'dark',
    color: 'daybreak',
    mode: 'side',
    fixedWidth: false,
    colorWeak: false
  });

  constructor() {
  }

  setThemesMode(mode: SettingInterface): void {
    this.themesMode$.next(mode);
  }

  getThemesMode(): Observable<SettingInterface> {
    return this.themesMode$.asObservable();
  }

}
