import { DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';


export abstract class InputComponentToken {

  abstract inputChangeDectction(): void;
}
@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.less'],
  providers: [{ provide: InputComponentToken, useExisting: InputNumberComponent }],
})
export class InputNumberComponent implements OnInit {
  _number: NzSafeAny;
  amt!: boolean;

  @Input()
  set Number(value: NzSafeAny) {
    this._number = this.decimalPipe.transform(value,"1.0-0");;
  }

  get Number(): NzSafeAny {
    this.inputChangeDectction();
    return this._number;
  }

  @Output() readonly changeNumber = new EventEmitter<any>();

  inputChangeDectction(): void {
    this.cdr.markForCheck();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private decimalPipe: DecimalPipe
    ) {}

  ngOnInit() {}


  onQueryParamsChange($event:any): void {
    this.changeNumber.emit($event.target.value.replace(/[^0-9.]+/g, ''));
  }

}
