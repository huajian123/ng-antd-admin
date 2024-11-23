import { inject, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { Dept } from '@services/system/dept.service';
import { ModalResponse, ModalWrapService } from '@widget/base-modal';
import { DeptManageModalComponent } from '@widget/biz-widget/system/dept-manage-modal/dept-manage-modal.component';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class DeptManageModalService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): Type<DeptManageModalComponent> {
    return DeptManageModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, modalData?: Dept): Observable<ModalResponse> {
    return this.modalWrapService.show<DeptManageModalComponent, Dept>(this.getContentComponent(), modalOptions, modalData);
  }
}
