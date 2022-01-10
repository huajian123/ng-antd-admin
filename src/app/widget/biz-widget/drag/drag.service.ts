import {Injectable} from '@angular/core';
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {DragComponent} from "./drag.component";
import {ModalOptions} from "ng-zorro-antd/modal";
import {Observable} from "rxjs";
import {ModalWrapService} from "@widget/base-modal";
@Injectable({
  providedIn: 'root'
})
export class DragService {

  constructor(private modalWrapService: ModalWrapService) {}

  protected getContentComponent(): NzSafeAny {
    return DragComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params)
  }
}
