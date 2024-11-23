import { inject, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalResponse, ModalWrapService } from '@widget/base-modal';
import { AppendFormModalComponent } from '@widget/biz-widget/form/append-form-modal/append-form-modal.component';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class AppendFormModalService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): Type<AppendFormModalComponent> {
    return AppendFormModalComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<ModalResponse> {
    return this.modalWrapService.show<AppendFormModalComponent, object>(this.getContentComponent(), modalOptions, params);
  }
}
