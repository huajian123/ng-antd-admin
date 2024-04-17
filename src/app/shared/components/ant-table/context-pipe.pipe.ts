import { Pipe, PipeTransform } from '@angular/core';

/*
 * 用于在调用table时，获取每一列的数据，而指定上下文
 * */
@Pipe({
  name: 'contextPipe',
  standalone: true
})
export class ContextPipePipe implements PipeTransform {
  transform(row: any, key: string): any {
    return { ...row, [key]: row };
  }
}
