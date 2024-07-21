import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, AfterViewInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

import { ip } from '@env/environment.prod';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzGridModule, NzInputModule, FormsModule, NzButtonModule, NzWaveModule, NzCardModule, NzResultModule, NzTypographyModule]
})
export class WebsocketComponent implements OnDestroy, AfterViewInit {
  concate = true;
  destroyRef = inject(DestroyRef);
  // https://github.com/ReactiveX/rxjs/issues/4166
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'websocket',
    breadcrumb: ['首页', '功能', 'websocket']
  };
  subject = webSocket(`ws://${ip}:8003/webSocket`);
  result: string[] = [];
  msg = '';

  private cdr = inject(ChangeDetectorRef);

  send(): void {
    this.subject.next(this.msg);
    this.msg = '';
  }

  end(): void {
    this.subject.complete();
    this.concate = false;
  }

  ngAfterViewInit(): void {
    this.subject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      // @ts-ignore
      this.result.push(res.message);
      this.result = [...this.result];
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subject.complete();
  }
}
