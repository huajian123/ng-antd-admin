import {Injectable, Injector} from '@angular/core';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {BaseModal} from '../../../base-modal';
import {InterAddEditComponent} from './inter-add-edit.component';
import {ModalOptions} from 'ng-zorro-antd/modal';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InterAddEditService extends BaseModal {

  constructor(private injector: Injector) {
    super(injector);
  }

  protected getContentComponent(): NzSafeAny {
    return InterAddEditComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return super.show({nzTitle: modalOptions.nzTitle}, params);
  }

/*  public show(modalOptions: ModalOptions = {}, params?: object): Promise<any> {
    return super.show({nzTitle: modalOptions.nzTitle}, params);
  }*/
}
