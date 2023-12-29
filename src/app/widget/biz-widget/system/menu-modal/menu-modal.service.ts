import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuListObj } from '@services/system/menus.service';
import { ModalWrapService } from '@widget/base-modal';
import { MenuModalComponent } from '@widget/biz-widget/system/menu-modal/menu-modal.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class MenuModalService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): NzSafeAny {
    return MenuModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, modalData?: MenuListObj): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, modalData);
  }
}
