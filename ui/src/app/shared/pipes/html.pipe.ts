import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Pipe({
  name: 'htmlPipe',
  standalone: true
})
export class HtmlPipe implements PipeTransform {
  private domSanitizer = inject(DomSanitizer);

  transform(value: NzSafeAny): NzSafeAny {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }
}
