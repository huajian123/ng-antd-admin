import {Injectable} from '@angular/core';
import {ModalOptions, NzModalRef, NzModalService} from 'ng-zorro-antd/modal';

export enum MessageType {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
  Confirm = 'confirm',
  Loading = 'loading'
}

export interface IModalOptions {
  title: string;
  message: string;
  type: MessageType;
  okCallBack: () => {};
  cancelCallBack: () => {};
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalSrv: NzModalService) {
  }

  // 弹出模态框
  public showAlertMessage(modalOptions: Partial<IModalOptions>): void {
    let modalRef: NzModalRef;
    const {title, message, type, okCallBack, cancelCallBack} = modalOptions;
    const options: ModalOptions = {
      nzTitle: title,
      nzContent: message,
      nzOnOk: () => {
        modalRef.destroy();
        okCallBack!();
      },
      nzOnCancel: () => {
        modalRef.destroy();
        cancelCallBack!();
      }
    };
    if (type === MessageType.Info) {
      options.nzTitle = options.nzTitle || '信息提示';
      modalRef = this.modalSrv.info(options);
    } else if (type === MessageType.Success) {
      options.nzTitle = options.nzTitle || '成功提示';
      modalRef = this.modalSrv.success(options);
    } else if (type === MessageType.Error) {
      options.nzTitle = options.nzTitle || '失败提示';
      modalRef = this.modalSrv.error(options);
    } else if (type === MessageType.Warning) {
      options.nzTitle = options.nzTitle || '警告提示';
      modalRef = this.modalSrv.warning(options);
    } else if (type === MessageType.Confirm) {
      options.nzTitle = options.nzTitle || '确认提示';
      modalRef = this.modalSrv.confirm(options);
    }
  }
}
