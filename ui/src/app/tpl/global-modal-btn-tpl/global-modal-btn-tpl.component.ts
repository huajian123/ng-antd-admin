import { ChangeDetectionStrategy, Component, computed, inject, Signal, TemplateRef, viewChild } from '@angular/core';

import { ModalFullStatusStoreService } from '@store/common-store/modal-full-status-store.service';
import { fnStopMouseEvent } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';

export abstract class GlobalModalBtnTplComponentToken {
  componentTpl!: Signal<TemplateRef<any>>;
  abstract fullScreenIconClick($event: MouseEvent): void;
  modalFullScreenFlag: Signal<boolean> | undefined;
}

@Component({
  selector: 'app-global-modal-btn-tpl',
  imports: [NzIconModule],
  templateUrl: './global-modal-btn-tpl.component.html',
  providers: [{ provide: GlobalModalBtnTplComponentToken, useExisting: GlobalModalBtnTplComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalModalBtnTplComponent implements GlobalModalBtnTplComponentToken {
  readonly componentTpl: Signal<TemplateRef<any>> = viewChild.required<TemplateRef<NzSafeAny>>('componentTpl');
  private modalFullStatusService = inject(ModalFullStatusStoreService);
  modalFullScreenFlag = computed(() => {
    return this.modalFullStatusService.$modalFullStatusStore();
  });

  fullScreenIconClick($event: MouseEvent): void {
    this.modalFullStatusService.$modalFullStatusStore.update(flag => !flag);
    // 可以阻止对话框关闭
    fnStopMouseEvent($event);
  }

  closeModal(): void {
    this.modalFullStatusService.$modalFullStatusStore.set(false);
  }
}
