import { Component, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { KeepAlive } from '@shared/directives/keep-alive';

import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-keep-alive',
  imports: [NzButtonComponent, NzCardModule, NzIconModule, PageHeaderComponent, NzInputDirective, ReactiveFormsModule, KeepAlive],
  templateUrl: './keep-alive.html',
  styleUrl: './keep-alive.less'
})
export class KeepAliveDemo {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'KeepAlive',
    breadcrumb: ['首页', '功能', 'KeepAlive'],
    desc: '使用 *appKeepAlive 指令保留输入框或表单的状态，切换后内容不丢失'
  };

  flag = signal(true);

  go(): void {
    this.flag.set(!this.flag());
  }
}
