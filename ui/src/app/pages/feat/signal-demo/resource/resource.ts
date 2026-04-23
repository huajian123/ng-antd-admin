import { ChangeDetectionStrategy, Component, signal, resource } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { FormsModule } from '@angular/forms';

interface UserData {
  name: string;
  email: string;
  role: string;
}

function mockFetch(id: number): Promise<UserData> {
  if (id === 0) return Promise.reject(new Error('用户 ID 不能为 0'));
  return new Promise(resolve => setTimeout(() => resolve({ name: `用户${id}`, email: `user${id}@example.com`, role: id % 2 === 0 ? '管理员' : '普通用户' }), 800));
}

@Component({
  selector: 'app-resource',
  imports: [PageHeaderComponent, NzCardModule, NzGridModule, NzButtonModule, NzWaveModule, NzSelectModule, NzTagModule, NzDividerModule, NzDescriptionsModule, NzSpinModule, FormsModule],
  templateUrl: './resource.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './resource.less'
})
export class Resource {
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'resource() API 演示',
    breadcrumb: ['首页', '组件', 'resource()'],
    desc: '演示 resource() 声明式异步数据加载，以及 rxResource() 与 RxJS 的集成'
  };

  // Card 1 & 2 & 3: shared userId signal
  readonly userId = signal(1);
  readonly userResource = resource({
    params: () => this.userId(),
    loader: ({ params: id }) => mockFetch(id)
  });

  readonly lastLoadTime = signal('—');
  reload(): void {
    this.userResource.reload();
    this.lastLoadTime.set(new Date().toLocaleTimeString());
  }

  triggerError(): void {
    this.userId.set(0);
  }
  triggerSuccess(): void {
    this.userId.set(Math.ceil(Math.random() * 5) || 1);
  }

  // Card 4: rxResource comparison
  readonly rxUserId = signal(1);
  readonly rxUserResource = rxResource<UserData, number>({
    params: () => this.rxUserId(),
    stream: ({ params: id }) => of<UserData>({ name: `用户${id}`, email: `user${id}@example.com`, role: '演示' }).pipe(delay(500))
  });
}

