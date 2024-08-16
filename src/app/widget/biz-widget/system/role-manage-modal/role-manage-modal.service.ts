import { inject, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { Role } from '@services/system/role.service';
import { ModalResponse, ModalWrapService } from '@widget/base-modal';
import { RoleManageModalComponent } from '@widget/biz-widget/system/role-manage-modal/role-manage-modal.component';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class RoleManageModalService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): Type<RoleManageModalComponent> {
    return RoleManageModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, modalData?: Role): Observable<ModalResponse> {
    return this.modalWrapService.show<RoleManageModalComponent, Role>(this.getContentComponent(), modalOptions, modalData);
  }
}
