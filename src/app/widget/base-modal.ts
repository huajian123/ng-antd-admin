import {NzModalRef, NzModalService} from 'ng-zorro-antd/modal';
import {Injector} from '@angular/core';

export abstract class BaseModal {
  protected modalRef!: NzModalRef;
  protected bsModalService: NzModalService;

  protected constructor(private baseInjector: Injector) {
    this.bsModalService = this.baseInjector.get(NzModalService);
  }

  public show(): void {

  }

}
