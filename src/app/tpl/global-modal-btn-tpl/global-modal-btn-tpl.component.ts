import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';

import { fnStopMouseEvent } from '@utils/tools';
import { NzIconModule } from 'ng-zorro-antd/icon';

export abstract class GlobalModalBtnTplComponentToken {
  componentTpl!: TemplateRef<any>;
  togleFullStatusEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  abstract fullScreenIconClick($event: MouseEvent): void;
  modalFullScreenFlag = false;
}

@Component({
  selector: 'app-global-modal-btn-tpl',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './global-modal-btn-tpl.component.html',
  providers: [{ provide: GlobalModalBtnTplComponentToken, useExisting: GlobalModalBtnTplComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalModalBtnTplComponent implements GlobalModalBtnTplComponentToken {
  @ViewChild('componentTpl', { static: true }) componentTpl!: TemplateRef<any>;
  modalFullScreenFlag = false;

  @Output() readonly togleFullStatusEmitter = new EventEmitter<boolean>();

  fullScreenIconClick($event: MouseEvent): void {
    this.modalFullScreenFlag = !this.modalFullScreenFlag;
    fnStopMouseEvent($event);
    this.togleFullStatusEmitter.emit(this.modalFullScreenFlag);
  }

  closeModal($event: MouseEvent): void {
    this.modalFullScreenFlag = false;
    this.togleFullStatusEmitter.emit(false);
  }
}
