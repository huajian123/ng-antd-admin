import { inject, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalResponse, ModalWrapService } from '@widget/base-modal';
import { ModalOptions } from 'ng-zorro-antd/modal';

import { DragComponent, DragModalData } from './drag.component';
@Injectable({
  providedIn: 'root'
})
export class DragService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): Type<DragComponent> {
    return DragComponent;
  }

  public show(modalOptions: ModalOptions = {}, modalData?: DragModalData): Observable<ModalResponse> {
    return this.modalWrapService.show<DragComponent, DragModalData>(this.getContentComponent(), modalOptions, modalData);
  }
}
