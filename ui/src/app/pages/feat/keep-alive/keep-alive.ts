import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { KeepAlive } from '@shared/directives/keep-alive';

import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-keep-alive',
  imports: [NzButtonComponent, PageHeaderComponent, NzInputDirective, ReactiveFormsModule, KeepAlive],
  templateUrl: './keep-alive.html'
})
export class KeepAliveDemo {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'KeepAlive',
    breadcrumb: ['首页', '功能', 'keepAlive'],
    desc: 'ng群主提供的指令，我觉得很棒分享给大家。你先输入一些内容到输入框，切换按钮，输入框中的内容仍然能保留'
  };

  flag = signal(true);

  go(): void {
    this.flag.set(!this.flag());
  }
}
