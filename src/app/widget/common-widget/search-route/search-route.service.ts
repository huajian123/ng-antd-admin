import {Injectable, Injector} from '@angular/core';
import {BaseModal} from "../../base-modal";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {SearchRouteComponent} from "./search-route.component";
import {ModalOptions} from "ng-zorro-antd/modal";
import {Observable} from "rxjs";
import {DragDrop} from "@angular/cdk/drag-drop";

@Injectable({
  providedIn: 'root'
})
export class SearchRouteService extends BaseModal {
  constructor(private injector: Injector, public dragDrop: DragDrop) {
    super(injector, dragDrop);
  }

  protected getContentComponent(): NzSafeAny {
    return SearchRouteComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return super.show(modalOptions, params);
  }
}

