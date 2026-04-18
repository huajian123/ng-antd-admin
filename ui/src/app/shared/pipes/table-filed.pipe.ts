import { Pipe, PipeTransform } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

function getByPath(obj: unknown, path: string, defaultVal: unknown = ''): unknown {
  if (obj == null || !path) return defaultVal;
  const result = path.split('.').reduce<unknown>((acc, key) => {
    if (acc != null && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
  return result ?? defaultVal;
}

@Pipe({
  name: 'tableFiledPipe',
})
export class TableFiledPipe implements PipeTransform {
  transform(value: NzSafeAny, args?: string): NzSafeAny {
    return getByPath(value, args ?? '', '');
  }
}
