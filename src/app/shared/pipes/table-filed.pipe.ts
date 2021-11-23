import {Pipe, PipeTransform} from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'tableFiledPipe',
})
export class TableFiledPipe implements PipeTransform {
  constructor() {
  }

  transform(value: any, args?: string): any {
    return _.get(value, args!, value);
  }
}
