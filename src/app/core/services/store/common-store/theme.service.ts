import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Theme, ThemeMode } from '@app/layout/default/setting-drawer/setting-drawer.component';

export interface SettingInterface {
  theme: Theme['key']; // 主题模式（暗黑模式，明亮模式）
  color: string; // 主题色
  mode: ThemeMode['key']; // 菜单模式（侧边模式，顶部模式，混合模式）
  colorWeak: boolean; // 色弱
  greyTheme: boolean; // 灰色模式
  fixedHead: boolean; // 固定头部
  splitNav: boolean; // 是否分割菜单（在菜单模式为混合模式时才生效）
  fixedLeftNav: boolean; // 固定左侧菜单
  isShowTab: boolean; // 是否展示多页签
  fixedTab: boolean; // 固定tab页签
  hasTopArea: boolean; // 是否展示顶部区域
  hasFooterArea: boolean; // 是否展示底部区域
  hasNavArea: boolean; // 是否有菜单
  hasNavHeadArea: boolean; // 菜单是否有菜单头
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
    isShowTab: true,
    colorWeak: false,
    greyTheme: false,
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
