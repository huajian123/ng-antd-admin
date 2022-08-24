import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SettingInterface {
  theme: 'dark' | 'light';
  color: string;
  mode: 'side' | 'top' | 'mixi';
  fixedWidth: boolean;
  colorWeak: boolean;
  fixedHead: boolean;
  splitNav: boolean;
  fixedLeftNav: boolean;
  fixedTab: boolean;
  hasTopArea: boolean;
  hasFooterArea: boolean;
  hasNavArea: boolean;
  hasNavHeadArea: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isNightTheme$ = new BehaviorSubject<boolean>(false);
  private isOverModeTheme$ = new BehaviorSubject<boolean>(false);
  private themesMode$ = new BehaviorSubject<SettingInterface>({
    theme: 'dark',
    color: '#1890FF',
    mode: 'side',
    fixedWidth: true,
    colorWeak: false,
    splitNav: false,
    fixedTab: true,
    fixedHead: true,
    fixedLeftNav: true,
    hasTopArea: true,
    hasFooterArea: true,
    hasNavArea: true,
    hasNavHeadArea: true
  });

  private isCollapsed$ = new BehaviorSubject<boolean>(false);

  constructor() {}

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

  // 主题是否over侧边栏
  setIsOverMode(isNight: boolean): void {
    this.isOverModeTheme$.next(isNight);
  }

  getIsOverMode(): Observable<boolean> {
    return this.isOverModeTheme$.asObservable();
  }

  // 菜单是否折叠
  setIsCollapsed(isCollapsed: boolean): void {
    this.isCollapsed$.next(isCollapsed);
  }

  getIsCollapsed(): Observable<boolean> {
    return this.isCollapsed$.asObservable();
  }
}
