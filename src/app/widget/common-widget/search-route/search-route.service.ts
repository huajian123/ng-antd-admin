import {Injectable} from '@angular/core';
import { ModalWrapService} from "../../base-modal";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {SearchRouteComponent} from "./search-route.component";
import {ModalOptions} from "ng-zorro-antd/modal";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchRouteService {
  constructor(private modalWrapService: ModalWrapService) {
  }

  protected getContentComponent(): NzSafeAny {
    return SearchRouteComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<any> {
    return this.modalWrapService.show(this.getContentComponent(), modalOptions, params);
  }
}

