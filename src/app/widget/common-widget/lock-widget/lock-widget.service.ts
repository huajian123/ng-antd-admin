import { Injectable } from '@angular/core';
import {ModalWrapService} from "@widget/base-modal";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {ModalOptions} from "ng-zorro-antd/modal";
import {Observable} from "rxjs";
import {LockWidgetComponent} from "@widget/common-widget/lock-widget/lock-widget.component";

@Injectable({
  providedIn: 'root'
})
export class LockWidgetService {

  constructor(private modalWrapService: ModalWrapService) {
  }

  protected getContentComponent(): NzSafeAny {
    return LockWidgetComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}

