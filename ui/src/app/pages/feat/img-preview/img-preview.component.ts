import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageService, NzImageModule } from 'ng-zorro-antd/image';

interface ImgItem {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrl: './img-preview.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzImageModule, NzButtonModule, NzWaveModule, NzCardModule, NzIconModule]
})
export class ImgPreviewComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '图片预览',
    breadcrumb: ['首页', '功能', '图片预览'],
    desc: '基于 nz-image 实现图片预览，支持分组切换与 Service 动态调用'
  };

  private nzImageService = inject(NzImageService);

  groupImages: ImgItem[] = [
    { src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', alt: 'Photo 1' },
    { src: 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg', alt: 'Angular' },
    { src: 'https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg', alt: 'ng-zorro' }
  ];

  onClick(): void {
    this.nzImageService.preview(
      this.groupImages.map(img => ({ src: img.src, alt: img.alt, width: '200px', height: '200px' })),
      { nzZoom: 1.5, nzRotate: 0 }
    );
  }
}
