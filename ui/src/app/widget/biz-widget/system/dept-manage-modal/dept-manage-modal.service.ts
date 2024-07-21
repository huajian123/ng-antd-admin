import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Dept } from '@services/system/dept.service';
import { ModalWrapService } from '@widget/base-modal';
import { DeptManageModalComponent } from '@widget/biz-widget/system/dept-manage-modal/dept-manage-modal.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class DeptManageModalService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): NzSafeAny {
    return DeptManageModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, modalData?: Dept): Observable<NzSafeAny> {
    return this.modalWrapService.show<Dept>(this.getContentComponent(), modalOptions, modalData);
  }
}
