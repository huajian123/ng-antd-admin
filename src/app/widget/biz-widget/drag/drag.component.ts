import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BasicConfirmModalComponent } from '@widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

/**
 * 这是一个从外部传入到对话框到数据
 */
export interface DragModalData {
  title: string;
}

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DragComponent extends BasicConfirmModalComponent implements OnInit {
  readonly nzModalData: DragModalData = inject(NZ_MODAL_DATA);
  messageService = inject(NzMessageService);
  constructor(override modalRef: NzModalRef) {
    super(modalRef);
  }

  protected getCurrentValue(): Observable<NzSafeAny> {
    return of(true);
  }

  ngOnInit(): void {
    this.messageService.info(`这是一个从外部传入到对话框到数据》》》》》${this.nzModalData.title}`);
  }
}
