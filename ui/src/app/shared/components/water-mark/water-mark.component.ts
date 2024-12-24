import { Component, ChangeDetectionStrategy, ElementRef, AfterViewInit, inject, viewChild } from '@angular/core';

import { WaterMarkService } from '@core/services/common/water-mark.service';

@Component({
  selector: 'app-water-mark',
  templateUrl: './water-mark.component.html',
  styleUrls: ['./water-mark.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class WaterMarkComponent implements AfterViewInit {
  readonly watermark = viewChild.required<ElementRef>('watermark');

  private waterMarkService = inject(WaterMarkService);

  ngAfterViewInit(): void {
    const watermarkImg = this.waterMarkService.getWatermark();
    this.watermark().nativeElement.style.backgroundImage = `url(${watermarkImg})`;
  }
}
