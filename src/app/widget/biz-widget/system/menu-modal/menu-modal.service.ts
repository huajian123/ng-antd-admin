import { inject, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { MenuListObj } from '@services/system/menus.service';
import { ModalResponse, ModalWrapService } from '@widget/base-modal';
import { MenuModalComponent } from '@widget/biz-widget/system/menu-modal/menu-modal.component';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class MenuModalService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): Type<MenuModalComponent> {
    return MenuModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, modalData?: MenuListObj): Observable<ModalResponse> {
    return this.modalWrapService.show<MenuModalComponent, MenuListObj>(this.getContentComponent(), modalOptions, modalData);
  }
}
