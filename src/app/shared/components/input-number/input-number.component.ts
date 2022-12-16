import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';


export abstract class InputComponentToken {

  abstract inputChangeDectction(): void;
}
@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'],
  providers: [{ provide: InputComponentToken, useExisting: InputNumberComponent }],
})
export class InputNumberComponent implements OnInit {
  _number = 0;
  amt!: boolean;

  @Input()
  set Number(value: NzSafeAny) {
    this._number = value;
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
    private cdr: ChangeDetectorRef
    ) {}

  ngOnInit() {}


  onQueryParamsChange($event:any): void {
    this._number = $event.target.value;
    this.changeNumber.emit(this._number);
  }

}
