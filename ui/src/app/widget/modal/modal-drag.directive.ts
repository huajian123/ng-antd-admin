import { Directive, inject } from '@angular/core';

import { NzModalComponent } from 'ng-zorro-antd/modal';

import { ModalDragService } from './modal-drag.service';

/**
 * 可拖动的对话框
 *
 * @example
 * ``` html
 * <nz-modal nzxModalDrag ></nz-modal>
 ```
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'nz-modal[nzxModalDrag]',
  standalone: true
})
export class ModalDragDirective {
  modalDragService = inject(ModalDragService);
  protected modal = inject(NzModalComponent, { host: true });

  constructor() {
    const wrapCls = this.modalDragService.getRandomCls();
    // afterOpen/afterClose 各自只会触发一次，且由 NzModalComponent 自身管理生命周期，
    // modal 销毁时这些 Observable 会自动 complete，无需 takeUntilDestroyed
    this.modal.afterOpen.subscribe(() => {
      const modelElement = this.modal.getElement()!;
      if (!modelElement || modelElement.className.indexOf(ModalDragService.DRAG_CLS_PREFIX) !== -1) {
        return;
      }

      modelElement.classList.add(wrapCls);
      const drag = this.modalDragService.createDragHandler(wrapCls, this.modal.nzModalType);
      this.modal.afterClose.subscribe(() => {
        if (drag && !drag.dropped) {
          drag.dispose();
        }
      });
    });
  }
}
