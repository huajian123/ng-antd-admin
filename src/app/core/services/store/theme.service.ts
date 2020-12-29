import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

export interface SettingInterface {
  theme: 'dark' | 'light';
  color: string;
  mode: 'side' | 'top';
  fixedWidth: boolean;
  colorWeak: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isNightTheme$ = new BehaviorSubject<boolean>(false);
  private themesMode$ = new BehaviorSubject<SettingInterface>({
    theme: 'dark',
    color: 'daybreak',
    mode: 'side',
    fixedWidth: false,
    colorWeak: false
  });

  private isCollapsed$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  // 获取主题参数
  setThemesMode(mode: SettingInterface): void {
    this.themesMode$.next(mode);
  }

  getThemesMode(): Observable<SettingInterface> {
    return this.themesMode$.asObservable();
  }

  // 主题是否是暗色主题
  setIsNightTheme(isNight: boolean): void {
    this.isNightTheme$.next(isNight);
  }

  getIsNightTheme(): Observable<boolean> {
    return this.isNightTheme$.asObservable();
  }

  setIsCollapsed(isCollapsed: boolean): void {
    this.isCollapsed$.next(isCollapsed);
  }

  getIsCollapsed(): Observable<boolean> {
    return this.isCollapsed$.asObservable();
  }

}
