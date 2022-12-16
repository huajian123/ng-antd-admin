import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export abstract class InputComponentToken {
  abstract inputChangeDectction(): void;
}

@Component({
  selector: 'app-input-currency',
  templateUrl: './input-currency.component.html',
  styleUrls: ['./input-currency.component.less'],
  providers: [{ provide: InputComponentToken, useExisting: InputCurrencyComponent }],
})
export class InputCurrencyComponent implements OnInit {

  _amount = 0;
  amt!: boolean;

  @Input()
  set Amount(value: NzSafeAny) {
    this._amount = value;
  }

  get Amount(): NzSafeAny {
    this.inputChangeDectction();
    return this._amount;
  }

  @Output() readonly changeAmount = new EventEmitter<any>();

  inputChangeDectction(): void {
    this.cdr.markForCheck();
  }

  constructor(
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {}


  onQueryParamsChange($event:any): void {
    this._amount = $event.target.value;
    this.changeAmount.emit(this._amount);
  }

}
