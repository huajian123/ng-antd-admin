import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalWrapService } from '@widget/base-modal';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalOptions } from 'ng-zorro-antd/modal';

import { DragComponent } from './drag.component';
@Injectable({
  providedIn: 'root'
})
export class DragService {
  constructor(private modalWrapService: ModalWrapService) {}

  protected getContentComponent(): NzSafeAny {
    return DragComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}
