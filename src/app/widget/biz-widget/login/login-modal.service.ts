import {Injectable, Injector} from '@angular/core';
import {BaseModal} from '../../base-modal';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {LoginModalComponent} from './login-modal.component';
import {ModalOptions} from 'ng-zorro-antd/modal';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginModalService  extends BaseModal{

  constructor(private injector: Injector) {
    super(injector);
  }

  protected getContentComponent(): NzSafeAny {
    return LoginModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return super.show(modalOptions, params);
  }
}
