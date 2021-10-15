import {Injectable, Injector} from '@angular/core';
import {BaseModal} from "../../base-modal";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {DragComponent} from "./drag.component";
import {ModalOptions} from "ng-zorro-antd/modal";
import {Observable} from "rxjs";
import {DragDrop} from "@angular/cdk/drag-drop";

@Injectable({
  providedIn: 'root'
})
export class DragService extends BaseModal {

  constructor(private injector: Injector, public dragDrop: DragDrop) {
    super(injector, dragDrop);
  }

  protected getContentComponent(): NzSafeAny {
    return DragComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return super.show(modalOptions, params);
  }
}
