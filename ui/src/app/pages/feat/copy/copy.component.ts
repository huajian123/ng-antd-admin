import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, NzButtonModule, NzInputModule, FormsModule, NzWaveModule, ClipboardModule]
})
export class CopyComponent {
  private msg = inject(NzMessageService);

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '文本复制示例',
    breadcrumb: ['首页', '功能', '剪切板']
  };
  value = '';

  info(): void {
    this.msg.success('复制成功，直接粘贴');
  }
}
