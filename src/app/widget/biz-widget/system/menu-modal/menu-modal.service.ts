import { Injectable } from '@angular/core';
import {ModalWrapService} from "@widget/base-modal";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {ModalOptions} from "ng-zorro-antd/modal";
import {Observable} from "rxjs";
import {MenuModalComponent} from "@widget/biz-widget/system/menu-modal/menu-modal.component";

@Injectable({
  providedIn: 'root'
})
export class MenuModalService {
  constructor(private modalWrapService: ModalWrapService) {}
  protected getContentComponent(): NzSafeAny {
    return MenuModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params)
  }
}
