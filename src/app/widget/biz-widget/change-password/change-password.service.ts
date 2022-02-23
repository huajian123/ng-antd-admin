import { Injectable } from '@angular/core';
import {ModalWrapService} from "../../base-modal";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {ModalOptions} from "ng-zorro-antd/modal";
import {Observable} from "rxjs";
import {ChangePasswordComponent} from "@widget/biz-widget/change-password/change-password.component";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {


  constructor(private modalWrapService: ModalWrapService) {}

  protected getContentComponent(): NzSafeAny {
    return ChangePasswordComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params)
  }
}
