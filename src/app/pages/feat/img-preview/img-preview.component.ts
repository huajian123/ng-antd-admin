import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzImageService, NzImageModule } from 'ng-zorro-antd/image';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzImageModule, NzSpaceModule, NzButtonModule, NzWaveModule]
})
export class ImgPreviewComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '图片预览',
    breadcrumb: ['首页', '功能', '图片预览']
  };

  private nzImageService = inject(NzImageService);

  onClick(): void {
    const images = [
      {
        src: 'https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg',
        width: '200px',
        height: '200px',
        alt: 'ng-zorro'
      },
      {
        src: 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg',
        width: '200px',
        height: '200px',
        alt: 'angular'
      }
    ];
    this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
  }
}
