import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Pipe({
  name: 'htmlPipe',
  standalone: true
})
export class HtmlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: NzSafeAny, args?: NzSafeAny): NzSafeAny {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }
}
