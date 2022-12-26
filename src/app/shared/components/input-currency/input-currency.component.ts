import { CurrencyPipe } from '@angular/common';
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

  _amount: any;
  _disable = false;
  amt!: boolean;

  @Input()
  set Amount(value: NzSafeAny) {
    this._amount = this.currencyPipe.transform(value*1000,"VND");
  }

  get Amount(): NzSafeAny {
    this.inputChangeDectction();
    return this._amount;
  }

  @Input()
  set Disable(value: NzSafeAny) {
    this._disable = value;
  }

  get Disable() {
    return this._disable;
  }

  @Output() readonly changeAmount = new EventEmitter<any>();

  inputChangeDectction(): void {
    this.cdr.markForCheck();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private currencyPipe: CurrencyPipe
    ) {}

  ngOnInit() {}


  onQueryParamsChange($event:any): void {
    this.changeAmount.emit(($event.target.value.replace(/[^0-9.]+/g, '')/1000));
  }

}
