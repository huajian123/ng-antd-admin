import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

import { ChildCounterComponent } from './child-counter/child-counter.component';
import { ChildDisplayComponent } from './child-display/child-display.component';
import { SharedSignalService } from './shared-signal.service';
@Component({
  selector: 'app-cross-comp-communication',
  imports: [
    PageHeaderComponent,
    NzCardModule,
    NzGridModule,
    NzButtonModule,
    NzWaveModule,
    NzInputModule,
    NzTagModule,
    NzDividerModule,
    NzDescriptionsModule,
    FormsModule,
    ChildDisplayComponent,
    ChildCounterComponent
  ],
  templateUrl: './cross-comp-communication.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './cross-comp-communication.less'
})
export class CrossCompCommunication {
  readonly pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Signal 跨组件通信',
    breadcrumb: ['首页', '功能', 'Signal 跨组件通信'],
    desc: '演示 input()、output()、model() 以及服务级 Signal 实现跨组件通信'
  };

  private readonly sharedService = inject(SharedSignalService);

  // Card 1: input() — 父→子
  readonly parentText = signal('Hello from parent');
  onParentTextInput(e: Event): void {
    this.parentText.set((e.target as HTMLInputElement).value);
  }

  // Card 2: output() — 子→父
  readonly receivedCount = signal(0);
  onCountChange(v: number): void {
    this.receivedCount.set(v);
  }

  // Card 3: model() — 双向绑定
  readonly parentChecked = signal(false);

  // Card 4: 服务级 Signal 共享（兄弟通信）
  readonly $sharedValue = this.sharedService.$sharedValue;
  onSharedInput(e: Event): void {
    this.$sharedValue.set((e.target as HTMLInputElement).value);
  }
}

