import {Injectable} from '@angular/core';
import { ModalWrapService} from '@widget/base-modal';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {ModalOptions} from 'ng-zorro-antd/modal';
import {Observable} from 'rxjs';
import {UserManageModalComponent} from './user-manage-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UserManageModalService{

  constructor(private modalWrapService: ModalWrapService) {}


  protected getContentComponent(): NzSafeAny {
    return UserManageModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params)
  }
}
