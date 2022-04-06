import {Injectable} from '@angular/core';
import {NzIconService} from "ng-zorro-antd/icon";

// 获取阿里图标库
@Injectable({
  providedIn: 'root'
})
export class LoadAliIconCdnService {

  constructor(private iconService: NzIconService) {
  }

  load(): void {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_3303907_ae3xrkj46ra.js'
    });
  }
}
