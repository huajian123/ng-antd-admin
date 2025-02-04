import { effect, Injectable, signal } from '@angular/core';

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

export type StyleTheme = 'default' | 'dark' | 'aliyun' | 'compact'; // 默认主题，暗黑主题，阿里云主题，紧凑主题

// 主题风格
export type StyleThemeInterface = Record<StyleTheme, boolean>;

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // todo 跟$themeStyle有重复，日后优化
  $isNightTheme = signal(false); // 暗黑主题
  $isCompactTheme = signal(false); // 紧凑主题
  $isOverModeTheme = signal(false); // over模式，即拖动浏览器宽度，至菜单栏消失的状态
  $isCollapsed = signal(false); // 菜单收缩模式，拖动浏览器至菜单自动缩短成图标
  $themesOptions = signal<SettingInterface>({
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
  $themeStyle = signal<StyleTheme>('default'); // 主题风格，暗黑，默认，紧凑，阿里云
  themeStyleChangeEffect = effect(() => {
    const source = this.$themeStyle();
    this.$isNightTheme.set(source === 'dark');
    this.$isCompactTheme.set(source === 'compact');
  });
}
