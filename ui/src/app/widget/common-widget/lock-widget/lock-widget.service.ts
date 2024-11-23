import { inject, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalResponse, ModalWrapService } from '@widget/base-modal';
import { LockWidgetComponent } from '@widget/common-widget/lock-widget/lock-widget.component';
import { ModalOptions } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root'
})
export class LockWidgetService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): Type<LockWidgetComponent> {
    return LockWidgetComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<ModalResponse> {
    return this.modalWrapService.show<LockWidgetComponent, object>(this.getContentComponent(), modalOptions, params);
  }
}
