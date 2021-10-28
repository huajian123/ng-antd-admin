import {Injectable} from '@angular/core';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import { ModalWrapService} from '../../../base-modal';
import {RoleManageModalComponent} from './role-manage-modal.component';
import {ModalOptions} from 'ng-zorro-antd/modal';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleManageModalService {

  constructor(private modalWrapService: ModalWrapService) {}


  protected getContentComponent(): NzSafeAny {
    return RoleManageModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params)
  }
}
