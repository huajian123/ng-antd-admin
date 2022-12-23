import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'changNumberToChinese'
})
export class ChangNumberToChinesePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 1:
        return 'số 1';
      case 2:
        return 'số 2';
      case 3:
        return 'số 3';
      case 4:
        return 'số 4';
      case 5:
        return 'số 5';
      case 6:
        return 'số 6';
      case 7:
        return 'số 7';
      case 8:
        return 'số 8';
      case 9:
        return 'số 9';
      case 10:
        return 'số 10';
      default:
        return '';
    }
  }
}
