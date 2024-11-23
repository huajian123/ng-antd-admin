import { Pipe, PipeTransform } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

/*
 * 用于在调用table时，获取每一列的数据，而指定上下文
 * */
@Pipe({
  name: 'contextPipe',
  standalone: true
})
export class ContextPipePipe implements PipeTransform {
  transform(row: NzSafeAny, key: string): NzSafeAny {
    return { ...row, [key]: row };
  }
}
