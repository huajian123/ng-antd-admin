import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Pipe({
  name: 'tableFiledPipe',
  standalone: true
})
export class TableFiledPipe implements PipeTransform {
  transform(value: NzSafeAny, args?: string): NzSafeAny {
    return _.get(value, args!, '');
  }
}
