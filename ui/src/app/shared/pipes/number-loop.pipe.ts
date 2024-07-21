import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberLoop',
  standalone: true
})
export class NumberLoopPipe implements PipeTransform {
  transform(value: number): number[] {
    return Array(value).fill(0);
  }
}
