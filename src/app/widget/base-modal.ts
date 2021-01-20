import {ModalOptions, NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {Injector} from '@angular/core';
import {deepMerge} from '../utils/other';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import * as _ from 'lodash';

export enum ModalBtnStatus {
  Cancel,
  Ok
}

// 组件实例需要继承此类
export abstract class BasicConfirmModalComponent {
  protected params: any; // service传给component instance的参数
  protected constructor() {
  }

  protected abstract getCurrentValue(): any;
}

export abstract class BaseModal {
  protected modalRef!: NzModalRef;
  protected bsModalService: NzModalService;

  protected constructor(private baseInjector: Injector) {
    this.bsModalService = this.baseInjector.get(NzModalService);
  }

  protected abstract getContentComponent(): NzSafeAny;

  private cancelCallback(contentComponentInstance?: object): void {
    return this.modalRef.destroy(null);
  }

  private confirmCallback(contentComponentInstance?: object): void {
    const value = (contentComponentInstance as any).getCurrentValue();
    if (!value) {
      return;
    }
    return this.modalRef.destroy({status: ModalBtnStatus.Ok, value});
  }

  show(modalOptions: ModalOptions = {}, params: object = {}): Promise<NzSafeAny> {
    this.modalRef = this.bsModalService.create(_.merge({
      nzTitle: '',
      nzContent: this.getContentComponent(),
      nzMaskClosable: false,
      nzFooter: [{
        label: '确认',
        type: 'primary',
        show: true,
        onClick: (this.confirmCallback).bind(this)
      }, {
        label: '取消',
        type: 'default',
        show: true,
        onClick: (this.cancelCallback).bind(this)
      }],
      nzClosable: true,
      nzWidth: 720,
      nzComponentParams: {
        params
      }, // 参数中的属性将传入nzContent实例中
    }, modalOptions));

    return new Promise((resolve, reject) => {
      this.modalRef.afterClose.subscribe((result: NzSafeAny) => {
        console.log(result);
        if (!result) {
          reject();
        } else {
          resolve(result);
        }
      });
    });
  }

}
