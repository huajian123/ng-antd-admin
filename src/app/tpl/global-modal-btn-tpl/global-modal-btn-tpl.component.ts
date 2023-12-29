import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ModalFullStatusStoreService } from '@store/common-store/modal-full-status-store.service';
import { fnStopMouseEvent } from '@utils/tools';
import { NzIconModule } from 'ng-zorro-antd/icon';

export abstract class GlobalModalBtnTplComponentToken {
  componentTpl!: TemplateRef<any>;
  abstract fullScreenIconClick($event: MouseEvent): void;
  modalFullScreenFlag = false;
}

@Component({
  selector: 'app-global-modal-btn-tpl',
  standalone: true,
  imports: [NzIconModule, AsyncPipe],
  templateUrl: './global-modal-btn-tpl.component.html',
  providers: [{ provide: GlobalModalBtnTplComponentToken, useExisting: GlobalModalBtnTplComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalModalBtnTplComponent implements GlobalModalBtnTplComponentToken {
  @ViewChild('componentTpl', { static: true }) componentTpl!: TemplateRef<any>;
  modalFullScreenFlag = false;
  private modalFullStatus = inject(ModalFullStatusStoreService);

  modalFullStatus$ = this.modalFullStatus.getModalFullStatusStore();

  constructor() {
    this.modalFullStatus$.pipe(takeUntilDestroyed()).subscribe(res => (this.modalFullScreenFlag = res));
  }

  fullScreenIconClick($event: MouseEvent): void {
    this.modalFullScreenFlag = !this.modalFullScreenFlag;
    this.modalFullStatus.setModalFullStatusStore(this.modalFullScreenFlag);
    // 可以阻止对话框关闭
    fnStopMouseEvent($event);
  }

  closeModal(): void {
    this.modalFullScreenFlag = false;
    this.modalFullStatus.setModalFullStatusStore(false);
  }
}
