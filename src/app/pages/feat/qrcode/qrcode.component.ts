import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { NzQRCodeModule } from 'ng-zorro-antd/qr-code';

@Component({
  selector: 'app-qrcode',
  standalone: true,
  imports: [CommonModule, NzQRCodeModule, PageHeaderComponent],
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrcodeComponent {}
