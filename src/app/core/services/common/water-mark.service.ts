import { Injectable } from '@angular/core';

/*
 * 水印服务
 * */
@Injectable({
  providedIn: 'root'
})
export class WaterMarkService {
  watermark = '';

  getWatermark(): string {
    if (!this.watermark) {
      const canvas = document.createElement('canvas');
      canvas.width = 332;
      canvas.height = 286;
      const ctx = canvas.getContext('2d');
      ctx!.fillStyle = 'rgba(24,144,255,0.15)';
      ctx!.font = '16px Georgia';
      ctx!.setTransform(1, -0.4, 0.4, 1, 0, 0);
      ctx!.fillText('Ng-Ant-Admin', 10, 100);
      this.watermark = canvas.toDataURL('image/png');
    }
    return this.watermark;
  }
}
