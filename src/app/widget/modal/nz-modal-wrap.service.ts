import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ConfirmType, ModalOptions, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

import { ModalDragService } from './modal-drag.service';

@Injectable({
  providedIn: 'root'
})
export class NzModalWrapService {
  modal = inject(NzModalService);
  modalDragService = inject(ModalDragService);

  /**
   * 创建对话框, 增加可拖拽功能
   *
   * @param config ModalOptions
   */
  create<T, R = NzSafeAny>(config: ModalOptions<T, R>): NzModalRef<T, R> {
    return this.createModalWidthDrag(config, c => this.modal.create(c));
  }

  get openModals(): NzModalRef[] {
    return this.modal.openModals;
  }

  get afterAllClosed(): Subject<void> {
    return this.modal._afterAllClosed;
  }

  closeAll(): void {
    this.modal.closeAll();
  }

  confirm<T>(options: ModalOptions<T>, confirmType?: ConfirmType): NzModalRef<T> {
    return this.createModalWidthDrag(options, c => this.modal.confirm(c));
  }

  info<T>(options: ModalOptions<T>): NzModalRef<T> {
    return this.createModalWidthDrag(options, c => this.modal.info(c));
  }

  success<T>(options: ModalOptions<T>): NzModalRef<T> {
    return this.createModalWidthDrag(options, c => this.modal.success(c));
  }

  error<T>(options: ModalOptions<T>): NzModalRef<T> {
    return this.createModalWidthDrag(options, c => this.modal.error(c));
  }

  warning<T>(options: ModalOptions<T>): NzModalRef<T> {
    return this.createModalWidthDrag(options, c => this.modal.warning(c));
  }

  protected createModalWidthDrag<T, R = NzSafeAny>(config: ModalOptions<T, R>, create: (newConfig: ModalOptions<T, R>) => NzModalRef<T, R>): NzModalRef {
    const wrapCls = this.modalDragService.getRandomCls();
    const newConfig = this.createModalConfig(config, wrapCls);
    const modalRef = create(newConfig);

    modalRef.afterOpen.subscribe(() => {
      const drag = this.modalDragService.createDragHandler(wrapCls, newConfig.nzModalType);
      modalRef.afterClose.subscribe(() => {
        if (drag && !drag.dropped) {
          drag.dispose();
        }
      });
    });

    return modalRef;
  }

  protected createModalConfig<T, R = NzSafeAny>(config: ModalOptions<T, R>, wrapCls: string): ModalOptions<T, R> {
    const defaultConfig: ModalOptions = {
      nzMaskClosable: false,
      nzTitle: '提示'
    };
    const maskStyle = config.nzMask === false ? { nzMaskStyle: { display: 'none' } } : {};
    const newConfig = Object.assign(defaultConfig, config, maskStyle);
    newConfig.nzWrapClassName = `${newConfig.nzWrapClassName || ''} ${wrapCls}`;
    return newConfig;
  }
}
