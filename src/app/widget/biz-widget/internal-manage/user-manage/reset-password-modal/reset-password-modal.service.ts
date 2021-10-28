import {Injectable, Injector} from '@angular/core';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {ModalOptions} from 'ng-zorro-antd/modal';
import {Observable} from 'rxjs';
import {ResetPasswordModalComponent} from './reset-password-modal.component';
import {ModalWrapService} from "../../../../base-modal";

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordModalService {

  constructor(private modalWrapService: ModalWrapService) {}


  protected getContentComponent(): NzSafeAny {
    return ResetPasswordModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params)
  }
}
