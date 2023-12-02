import { Component, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ExampleService } from '@services/example/example.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzButtonModule, NzWaveModule]
})
export class SessionTimeoutComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '登录超时',
    breadcrumb: ['首页', '功能', '登录超时'],
    desc: '用户登录超时示例。如果redis超时了，则重新弹出登录框，登录成功则将原先的接口重新发送，' + '登录失败，则跳转到登录页面。'
  };
  destroyRef = inject(DestroyRef);

  private dataService = inject(ExampleService);

  go(): void {
    this.dataService.sessionTimeOut().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
