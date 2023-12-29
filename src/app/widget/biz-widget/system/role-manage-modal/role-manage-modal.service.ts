import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Role } from '@services/system/role.service';
import { ModalWrapService } from '@widget/base-modal';
import { RoleManageModalComponent } from '@widget/biz-widget/system/role-manage-modal/role-manage-modal.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class RoleManageModalService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): NzSafeAny {
    return RoleManageModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, modalData?: Role): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, modalData);
  }
}
