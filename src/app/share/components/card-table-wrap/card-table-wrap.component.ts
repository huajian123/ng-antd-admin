import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzSafeAny} from 'ng-zorro-antd/core/types';

interface ActionCodeObj {
  add?: string;
}

@Component({
  selector: 'app-card-table-wrap',
  templateUrl: './card-table-wrap.component.html',
  styleUrls: ['./card-table-wrap.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTableWrapComponent implements OnInit {
  @Input() needTableTitle: boolean;
  @Input() needAddBtn: boolean;
  @Output() add = new EventEmitter<NzSafeAny>();
  @Input() actionCode!: ActionCodeObj;

  constructor() {
    this.needAddBtn = false;
    this.needTableTitle = true;
  }

  addBtnClick(): void {
    this.add.emit();
  }

  ngOnInit(): void {
  }

}
