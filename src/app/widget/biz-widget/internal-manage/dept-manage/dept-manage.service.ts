import {Injectable} from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {DeptManageComponent} from './dept-manage.component';
import {ModalOptions} from 'ng-zorro-antd/modal';
import {Observable} from 'rxjs';
import {ModalWrapService} from "@widget/base-modal";

@Injectable({
  providedIn: 'root'
})
export class DeptManageModalService{

  constructor(private modalWrapService: ModalWrapService) {}


  protected getContentComponent(): NzSafeAny {
    return DeptManageComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params)
  }
}
