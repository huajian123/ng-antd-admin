import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card-table-wrap',
  templateUrl: './card-table-wrap.component.html',
  styleUrls: ['./card-table-wrap.component.less']
})
export class CardTableWrapComponent implements OnInit {
  @Input() needAddBtn: boolean;
  @Output() add = new EventEmitter<any>();

  constructor() {
    this.needAddBtn = false;
  }

  addBtnClick(): void {
    this.add.emit();
  }

  ngOnInit(): void {
  }

}
