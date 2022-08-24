import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BasicConfirmModalComponent } from '@widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragComponent extends BasicConfirmModalComponent implements OnInit {
  override params: object;

  constructor(override modalRef: NzModalRef) {
    super(modalRef);
    this.params = {};
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    return of(true);
  }

  ngOnInit(): void {}
}
