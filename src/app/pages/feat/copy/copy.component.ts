import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '文本复制示例',
    breadcrumb: ['首页', '功能', '剪切板']
  };
  value = '';

  constructor(private msg: NzMessageService) {}

  info(): void {
    this.msg.success('复制成功，直接粘贴');
  }

  ngOnInit(): void {}
}
