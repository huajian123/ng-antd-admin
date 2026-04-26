import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { LanguageService, Lang } from '@core/services/store/common-store/language.service';
import { AntTableComponent, AntTableConfig } from '@shared/components/ant-table/ant-table.component';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzAlertModule } from 'ng-zorro-antd/alert';

interface LangOption {
  key: Lang;
  label: string;
  nativeName: string;
  flag: string;
  region: string;
  color: string;
}

interface TranslationKey {
  key: string;
  zh_CN: string;
  zh_TW: string;
  en_US: string;
  vi_VN: string;
  category: string;
}

@Component({
  selector: 'app-multilingual',
  templateUrl: './multilingual.html',
  styleUrl: './multilingual.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule, AntTableComponent, NzCardModule, NzTagModule, NzDividerModule, NzBadgeModule, NzIconModule, NzGridModule, NzStatisticModule, NzTimelineModule, NzAlertModule]
})
export class Multilingual {
  private langService = inject(LanguageService);

  currentLang = this.langService.$currentLang;

  langOptions: LangOption[] = [
    { key: 'zh_CN', label: '简体中文', nativeName: 'Simplified Chinese', flag: '🇨🇳', region: 'China Mainland', color: '#f5222d' },
    { key: 'zh_TW', label: '繁體中文', nativeName: 'Traditional Chinese', flag: '🇨🇳', region: ' HK / Macau', color: '#fa8c16' },
    { key: 'en_US', label: 'English', nativeName: 'American English', flag: '🇺🇸', region: 'United States', color: '#1677ff' },
    { key: 'vi_VN', label: 'Tiếng Việt', nativeName: 'Vietnamese', flag: '🇻🇳', region: 'Vietnam', color: '#52c41a' }
  ];

  translationKeys: TranslationKey[] = [
    { key: 'common.search', zh_CN: '搜索', zh_TW: '搜尋', en_US: 'Search', vi_VN: 'Tìm kiếm', category: 'common' },
    { key: 'common.logout', zh_CN: '退出登录', zh_TW: '登出', en_US: 'Logout', vi_VN: 'Đăng xuất', category: 'common' },
    { key: 'common.lockScreen', zh_CN: '锁定屏幕', zh_TW: '鎖定螢幕', en_US: 'Lock Screen', vi_VN: 'Khóa màn hình', category: 'common' },
    { key: 'common.fullscreen', zh_CN: '全屏', zh_TW: '全螢幕', en_US: 'Fullscreen', vi_VN: 'Toàn màn hình', category: 'common' },
    { key: 'tab.refresh', zh_CN: '刷新', zh_TW: '重新整理', en_US: 'Refresh', vi_VN: 'Làm mới', category: 'tab' },
    { key: 'tab.closeTab', zh_CN: '关闭标签', zh_TW: '關閉標籤', en_US: 'Close Tab', vi_VN: 'Đóng tab', category: 'tab' },
    { key: 'lockScreen.clickToUnlock', zh_CN: '点击解锁', zh_TW: '點擊解鎖', en_US: 'Click to Unlock', vi_VN: 'Nhấn để mở khóa', category: 'lockScreen' },
    { key: 'searchRoute.placeholder', zh_CN: '搜索', zh_TW: '搜尋', en_US: 'Search', vi_VN: 'Tìm kiếm', category: 'searchRoute' }
  ];

  tableConfig: AntTableConfig = {
    pageIndex: 1,
    pageSize: 100,
    total: 8,
    loading: false,
    needNoScroll: true,
    headers: [
      { title: 'Translation Key', field: 'key', width: 220 },
      { title: '🇨🇳 简体中文', field: 'zh_CN', width: 120 },
      { title: '🇹🇼 繁體中文', field: 'zh_TW', width: 120 },
      { title: '🇺🇸 English', field: 'en_US', width: 120 },
      { title: '🇻🇳 Tiếng Việt', field: 'vi_VN', width: 120 },
      { title: '分类', field: 'category', width: 100 }
    ]
  };

  currentLangOption = computed(() => this.langOptions.find(o => o.key === this.currentLang()) ?? this.langOptions[0]);

  previewKeys = ['common.search', 'common.logout', 'common.lockScreen', 'common.fullscreen', 'tab.refresh', 'tab.closeTab', 'lockScreen.clickToUnlock', 'searchRoute.placeholder'];

  switchLang(lang: Lang): void {
    this.langService.setLang(lang);
  }

  pipeExample = `<!-- 在模板中直接使用 -->
{{ 'common.search' | translate }}

<!-- 带参数插值 -->
{{ 'msg.hello' | translate: { name: 'World' } }}`;

  serviceExample = `// 注入服务
private langService = inject(LanguageService);

// 切换语言
switchLang(lang: Lang): void {
  this.langService.setLang(lang);
}

// 读取当前语言（Signal）
currentLang = this.langService.$currentLang;`;
}
