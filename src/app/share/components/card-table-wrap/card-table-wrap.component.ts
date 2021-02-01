import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
  @Input() needAddBtn: boolean;
  @Output() add = new EventEmitter<any>();
  @Input() actionCode!: ActionCodeObj;

  constructor() {
    this.needAddBtn = false;
  }

  addBtnClick(): void {
    this.add.emit();
  }

  ngOnInit(): void {
  }

}
