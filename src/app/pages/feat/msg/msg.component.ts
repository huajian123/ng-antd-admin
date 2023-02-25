import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, TemplateRef } from '@angular/core';

import { DestroyService } from '@core/services/common/destory.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

type common = 'info' | 'success' | 'warning' | 'error';
type msgType = common | 'loading';
type confirmType = common | 'info' | 'confirm';

@Component({
  selector: 'app-button',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, NzButtonModule, NzWaveModule, NzIconModule]
})
export class MsgComponent implements OnInit {
  map = {
    info: 'exclamation-circle',
    warning: 'exclamation-circle',
    success: 'check',
    error: 'close',
    confirm: 'confirm'
  };

  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '消息提示',
    breadcrumb: ['首页', '功能', '消息提示'],
    desc: '这个是好心人pr的功能'
  };

  constructor(private cdr: ChangeDetectorRef, private destroy$: DestroyService, private message: NzMessageService, private modal: NzModalService, private notification: NzNotificationService) {}

  msg(type: msgType): void {
    this.message[type](`${type} message`);
  }

  modalShow(confirm: confirmType, modal: confirmType): void {
    this.modal[confirm]({
      nzTitle: `This is a ${modal} message`,
      nzContent: `<p>${modal} messages</p>`,
      nzOnOk: () => console.log('Info OK'),
      nzOnCancel: () => console.log('Info cancel'),
      nzIconType: this.map[modal]
    });
  }

  createBasicNotification(template: TemplateRef<{}>): void {
    this.notification.template(template);
  }

  ngOnInit(): void {}
}
