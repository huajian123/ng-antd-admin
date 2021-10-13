import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {BasicConfirmModalComponent} from "../../base-modal";
import {NzModalRef} from "ng-zorro-antd/modal";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragComponent  extends BasicConfirmModalComponent implements OnInit {

  params: object;

  constructor(private modalRef: NzModalRef) {
    super();
    this.params = {};
  }

  protected getCurrentValue(): Observable<any> {
    return of(true);
  }

  ngOnInit(): void {
  }

}
