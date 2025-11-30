import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { WaterMarkComponent } from '@shared/components/water-mark/water-mark.component';

@Component({
  selector: 'app-water-mark-demo',
  imports: [PageHeaderComponent, WaterMarkComponent],
  templateUrl: './water-mark.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaterMarkDemoComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '水印',
    breadcrumb: ['首页', '功能', '水印'],
    desc: '自己封装的水印组件，也可以使用zorro官网的，示例,https://ng.ant.design/components/water-mark/zh'
  };
}
