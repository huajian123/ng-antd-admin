import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

@Component({
  selector: 'app-qrcode',
  standalone: true,
  imports: [NzQRCodeModule, PageHeaderComponent],
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrcodeComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '二维码',
    breadcrumb: ['首页', '功能', '二维码'],
    desc: '不要扫陌生人的二维码，防诈从我做起。可以考虑使用https://github.com/cordobo/angularx-qrcode本项目ng16之前的版本有安装使用'
  };
}
