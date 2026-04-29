import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IconSelComponent } from '@shared/biz-components/icon-sel/icon-sel.component';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

interface IconItem {
  type: string;
  label: string;
  color?: string;
}

interface TwotoneIconItem {
  type: string;
  label: string;
  color: string;
}

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzCardModule, NzButtonModule, NzWaveModule, NzInputModule, FormsModule, IconSelComponent, NzIconModule]
})
export class IconsComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '图标',
    breadcrumb: ['首页', '功能', '图标'],
    desc: '在图标选择器中演示：搜索防抖，前端分页功能。'
  };

  selectedIcon = '';
  visible = false;

  outlineIcons: IconItem[] = [
    { type: 'google', label: 'Google' },
    { type: 'qq', label: 'QQ' },
    { type: 'gitlab', label: 'GitLab' },
    { type: 'alipay-circle', label: 'Alipay' },
    { type: 'github', label: 'GitHub' },
    { type: 'wechat', label: 'WeChat' },
    { type: 'twitter', label: 'Twitter' },
    { type: 'youtube', label: 'YouTube' }
  ];

  twotoneIcons: TwotoneIconItem[] = [
    { type: 'smile', label: 'Smile', color: '#1677ff' },
    { type: 'heart', label: 'Heart', color: '#eb2f96' },
    { type: 'check-circle', label: 'Check', color: '#52c41a' },
    { type: 'warning', label: 'Warning', color: '#faad14' },
    { type: 'close-circle', label: 'Close', color: '#ff4d4f' },
    { type: 'star', label: 'Star', color: '#faad14' }
  ];

  iconfontIcons: IconItem[] = [
    { type: 'icon-medium', label: 'Medium' },
    { type: 'icon-avtimer', label: 'Av Timer' },
    { type: 'icon-guanyuwomen', label: '关于我们' },
    { type: 'icon-mel-help', label: 'Help' },
    { type: 'icon-xinshouyindao', label: '新手引导' },
    { type: 'icon-yemian-', label: '页面' }
  ];
}
