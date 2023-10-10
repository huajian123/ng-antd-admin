import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrcodeComponent {}
