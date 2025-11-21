import { Directive, inject, Input } from '@angular/core';

import { NzModalComponent } from 'ng-zorro-antd/modal';

import { ModalResizeConfig, ModalResizeService } from './modal-resize.service';

/**
 * 可调整大小的对话框
 *
 * @example
 * ``` html
 * <nz-modal nzxModalResize></nz-modal>
 * <nz-modal nzxModalResize [nzxResizeConfig]="{minWidth: 500, minHeight: 400}"></nz-modal>
 * ```
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'nz-modal[nzxModalResize]',
  standalone: true
})
export class ModalResizeDirective {
  @Input() nzxResizeConfig?: ModalResizeConfig;

  modalResizeService = inject(ModalResizeService);
  protected modal = inject(NzModalComponent, { host: true });

  constructor() {
    this.modal.afterOpen.subscribe(() => {
      const modalElement = this.modal.getElement()!;
      if (!modalElement) {
        return;
      }

      // 生成唯一类名
      const wrapCls = `modal-resize-${Date.now()}-${Math.random().toString().replace('0.', '')}`;
      modalElement.classList.add(wrapCls);

      // 创建调整大小手柄
      this.modalResizeService.createResizeHandlers(wrapCls, this.nzxResizeConfig);

      this.modal.afterClose.subscribe(() => {
        this.modalResizeService.dispose();
      });
    });
  }
}
