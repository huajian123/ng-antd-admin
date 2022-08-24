import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { WaterMarkService } from '@core/services/common/water-mark.service';

@Component({
  selector: 'app-water-mark',
  templateUrl: './water-mark.component.html',
  styleUrls: ['./water-mark.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaterMarkComponent implements OnInit, AfterViewInit {
  @ViewChild('watermark', { static: false }) watermark!: ElementRef;

  constructor(private waterMarkService: WaterMarkService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const watermarkImg = this.waterMarkService.getWatermark();
    this.watermark.nativeElement.style.backgroundImage = `url(${watermarkImg})`;
  }
}
