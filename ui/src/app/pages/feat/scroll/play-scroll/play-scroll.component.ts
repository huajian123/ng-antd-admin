import { Component, ChangeDetectionStrategy, inject, DOCUMENT } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-play-scroll',
  templateUrl: './play-scroll.component.html',
  styleUrl: './play-scroll.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzCardModule, NzGridModule, NzButtonModule, NzIconModule]
})
export class PlayScrollComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '滚动控制',
    breadcrumb: ['首页', '功能', '滚动控制'],
    desc: '通过 NzScrollService 以编程方式控制页面或指定容器的滚动位置'
  };

  readonly scrollItems = [
    { id: 1, text: '山治，我要吃肉' },
    { id: 2, text: '娜美衣服的料子是越来越少了' },
    { id: 3, text: '人生最痛苦的是梦醒了无路可以走。做梦的人是幸福的；倘没有看出可走的路，最要紧的是不要去惊醒他。《娜拉走后怎样》一九二三年' },
    { id: 4, text: '我们目下的当务之急，是：一要生存，二要温饱，三要发展。苟有阻碍这前途者，无论是古是今，是人是鬼，是《三填五典》，百宋千元，天球河图，金人玉佛，祖传丸散，秘制膏丹，全都踏倒他。《忽然想到》一九二五年' },
    { id: 5, text: '专制者反面就是奴才，有权时无所不为，失势时即奴性十足。《谚语》一九三三年' },
    { id: 6, text: '悲剧将人生的有价值的东西毁灭给人看，喜剧将那无价值的撕破给人看。《再论雷峰塔的倒掉》' },
    { id: 7, text: '其实地上本没有路，走的人多了，也便成了路。《故乡》' }
  ];

  readonly fillerItems = Array.from({ length: 20 }, (_, i) => i % 2 === 0 ? '兽人永不为奴' : '野猪套天下第一');
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
