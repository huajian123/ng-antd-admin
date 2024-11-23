import { Component, ChangeDetectionStrategy, AfterViewInit, inject } from '@angular/core';

import { LazyService } from '@core/services/common/lazy.service';

@Component({
  selector: 'app-luckysheet',
  templateUrl: './luckysheet.component.html',
  styleUrls: ['./luckysheet.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class LuckysheetComponent implements AfterViewInit {
  private lazyService = inject(LazyService);

  ngAfterViewInit(): void {
    this.lazyService
      .load([
        'https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/css/pluginsCss.css',
        'https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/plugins.css',
        'https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/css/luckysheet.css',
        'https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/assets/iconfont/iconfont.css',
        'https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/js/plugin.js',
        'https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/luckysheet.umd.js'
      ])
      .then(() => {
        const options = {
          userName: 'NgAntAdmin', // 用户名
          myFolderUrl: 'https://github.com/huajian123/ng-antd-admin',
          container: 'luckysheet',
          title: '简单的示例', // 设定表格名称
          lang: 'zh' // 设定表格语言
        };
        // @ts-ignore
        luckysheet.create(options);
      });
  }
}
