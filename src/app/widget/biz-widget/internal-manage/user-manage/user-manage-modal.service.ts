import {Injectable, Injector} from '@angular/core';
import {BaseModal} from '../../../base-modal';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {ModalOptions} from 'ng-zorro-antd/modal';
import {Observable} from 'rxjs';
import {UserManageModalComponent} from './user-manage-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UserManageModalService extends BaseModal{

  constructor(private injector: Injector) {
    super(injector);
  }

  protected getContentComponent(): NzSafeAny {
    return UserManageModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return super.show(modalOptions, params);
  }
}
