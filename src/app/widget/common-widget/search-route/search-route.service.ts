import { inject, Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalResponse, ModalWrapService } from '@widget/base-modal';
import { ModalOptions } from 'ng-zorro-antd/modal';

import { SearchRouteComponent } from './search-route.component';

@Injectable({
  providedIn: 'root'
})
export class SearchRouteService {
  private modalWrapService = inject(ModalWrapService);

  protected getContentComponent(): Type<SearchRouteComponent> {
    return SearchRouteComponent;
  }

  public show(modalOptions: ModalOptions = {}, params?: object): Observable<ModalResponse> {
    return this.modalWrapService.show<SearchRouteComponent, object>(this.getContentComponent(), modalOptions, params);
  }
}
