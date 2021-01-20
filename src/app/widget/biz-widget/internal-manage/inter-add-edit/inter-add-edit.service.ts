import {Injectable, Injector} from '@angular/core';
import {NzSafeAny} from 'ng-zorro-antd/core/types';
import {BaseModal} from '../../../base-modal';
import {InterAddEditComponent} from './inter-add-edit.component';

@Injectable({
  providedIn: 'root'
})
export class InterAddEditService extends BaseModal {

  constructor(private injector: Injector) {
    super(injector);
  }

  protected getContentComponent(): NzSafeAny {
    return InterAddEditComponent;
  }

  public show(params: any = {}): Promise<any> {
    return super.show({nzTitle: params.title}, params);
  }
}
