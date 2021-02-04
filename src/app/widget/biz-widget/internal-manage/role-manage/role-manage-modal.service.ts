import {Injectable, Injector} from '@angular/core';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {BaseModal} from '../../../base-modal';
import {RoleManageModalComponent} from './role-manage-modal.component';
import {ModalOptions} from 'ng-zorro-antd/modal';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleManageModalService extends BaseModal {

  constructor(private injector: Injector) {
    super(injector);
  }

  protected getContentComponent(): NzSafeAny {
    return RoleManageModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return super.show(modalOptions, params);
  }
}
