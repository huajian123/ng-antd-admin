import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaterMarkService {
  watermark = '';

  constructor() {
  }

  getWatermark() {
    if (!this.watermark) {
      const canvas = document.createElement('canvas');
      canvas.width = 332;
      canvas.height = 286;
      const ctx = canvas.getContext('2d');
      ctx!.fillStyle = 'rgba(24,144,255,0.15)';
      ctx!.font = '16px Georgia';
      ctx!.setTransform(1, -0.4, 0.4, 1, 0, 0);
      ctx!.fillText('我是一个水印', 10, 100);
      this.watermark = canvas.toDataURL('image/png');
    }
    return this.watermark;
  }
}
