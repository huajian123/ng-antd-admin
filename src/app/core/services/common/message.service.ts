import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ModalOptions } from 'ng-zorro-antd/modal/modal-types';

export const enum MessageType {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
  Confirm = 'confirm',
  Loading = 'loading'
}

export const enum MessageCallback {
  Cancel = 'onCancel',
  Ok = 'onOk'
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  modalCtrl: NzModalRef[] = [];

  constructor(private nzModalService: NzModalService, private router: Router, private toastService: NzMessageService) {
    this.router.events.pipe(filter((event: NzSafeAny) => event instanceof NavigationEnd)).subscribe((event: NzSafeAny) => {
      for (let i = 0, len = this.modalCtrl.length; i < len; i++) {
        this.modalCtrl[i].destroy(MessageCallback.Cancel);
      }
      this.modalCtrl = [];
    });
  }

  public showAlertMessage(title: string, message: string, type: MessageType = MessageType.Info): void {
    let modalRef: NzModalRef;
    const options: ModalOptions = {
      nzTitle: title,
      nzContent: message,
      nzOnOk: () => {
        modalRef.destroy(MessageCallback.Ok);
      },
      nzOnCancel: () => {
        modalRef.destroy(MessageCallback.Cancel);
      }
    };
    if (type === MessageType.Info) {
      options.nzTitle = options.nzTitle || '信息提示';
      modalRef = this.nzModalService.info(options);
    } else if (type === MessageType.Success) {
      options.nzTitle = options.nzTitle || '成功提示';
      modalRef = this.nzModalService.success(options);
    } else if (type === MessageType.Error) {
      options.nzTitle = options.nzTitle || '失败提示';
      modalRef = this.nzModalService.error(options);
    } else if (type === MessageType.Warning) {
      options.nzTitle = options.nzTitle || '警告提示';
      modalRef = this.nzModalService.warning(options);
    } else if (type === MessageType.Confirm) {
      options.nzTitle = options.nzTitle || '确认提示';
      modalRef = this.nzModalService.confirm(options);
    }
    this.modalCtrl.push(modalRef!);
    modalRef!.afterClose.subscribe(() => {
      for (let i = 0, len = this.modalCtrl.length; i < len; i++) {
        if (this.modalCtrl[i] === modalRef) {
          this.modalCtrl.splice(i, 1);
          break;
        }
      }
    });
  }
}
