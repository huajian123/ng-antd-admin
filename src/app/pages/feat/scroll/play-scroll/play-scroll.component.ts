import { DOCUMENT } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzGridModule } from 'ng-zorro-antd/grid';

/*https://segmentfault.com/a/1190000020769492*/
@Component({
  selector: 'app-play-scroll',
  templateUrl: './play-scroll.component.html',
  styleUrls: ['./play-scroll.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, NzGridModule, NzButtonModule, NzWaveModule]
})
export class PlayScrollComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '玩弄滚动条',
    breadcrumb: ['首页', '拓展功能', '玩弄滚动条'],
    desc: '传说有一位少年骑着电驴去买瓜'
  };
  private scrollService = inject(NzScrollService);
  private _doc = inject(DOCUMENT);

  toDocBottom(): void {
    this.scrollService.scrollTo(null, this._doc.body.scrollHeight);
  }

  toDoc100(): void {
    this.scrollService.scrollTo(null, 100);
  }

  toBox1(): void {
    this.scrollService.scrollTo(this._doc.querySelector('#div-scroll3'), 100);
  }

  toBox2(): void {
    this.scrollService.scrollTo(this._doc.querySelector('#div-scroll4'), 100);
  }

  toDocHead(): void {
    this.scrollService.scrollTo(null, 0);
  }
}
