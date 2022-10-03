import { Injectable } from '@angular/core';

import { NzIconService } from 'ng-zorro-antd/icon';

// 获取阿里图标库
@Injectable({
  providedIn: 'root'
})
export class LoadAliIconCdnService {
  constructor(private iconService: NzIconService) {}

  load(): void {
    // 这个js你要自己去阿里图标库的官网自己生成
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_3303907_htrdo3n69kc.js'
    });
  }
}
