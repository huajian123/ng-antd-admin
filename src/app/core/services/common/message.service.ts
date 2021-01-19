import {Injectable} from '@angular/core';
import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {NavigationEnd, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ModalOptions} from 'ng-zorro-antd/modal/modal-types';
import {filter} from 'rxjs/operators';

export enum MessageType {
  Info = 'info',
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
  Confirm = 'confirm',
  Loading = 'loading'
}

export enum MessageCallback {
  Cancel = 'onCancel',
  Ok = 'onOk'
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
}
