import { Pipe, PipeTransform } from '@angular/core';

import * as _ from 'lodash';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Pipe({
  name: 'tableFiledPipe'
})
export class TableFiledPipe implements PipeTransform {
  constructor() {}

  transform(value: NzSafeAny, args?: string): NzSafeAny {
    return _.get(value, args!, '');
  }
}
