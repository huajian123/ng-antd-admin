import { Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { ModalBtnStatus } from '@widget/base-modal';
import * as _ from 'lodash';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDrawerOptions, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Injectable({ providedIn: 'root' })
export class DrawerWrapService {
  protected bsDrawerService: NzDrawerService;
  private btnTpl!: TemplateRef<any>;
  drawerRef!: NzDrawerRef;

  constructor(private baseInjector: Injector) {
    this.bsDrawerService = this.baseInjector.get(NzDrawerService);
  }

  show(component: Type<NzSafeAny>, drawerOptions: NzDrawerOptions = {}, params: object = {}): Observable<NzSafeAny> {
    const newOptions = this.createDrawerConfig(component, drawerOptions, params);
    this.drawerRef = this.bsDrawerService.create(newOptions);
    return this.drawerRef.afterClose.pipe(
      map(res => {
        return !res ? { status: ModalBtnStatus.Cancel, value: null } : res;
      })
    );
  }

  createDrawerConfig(component: Type<NzSafeAny>, drawerOptions: NzDrawerOptions = {}, params: object = {}): NzDrawerOptions {
    const defaultOptions: NzDrawerOptions = {
      nzContent: component,
      nzClosable: false,
      nzContentParams: {
        params
      },
      nzFooter: this.btnTpl
    };
    return _.merge(defaultOptions, drawerOptions);
  }

  setTemplate(btnTpl: TemplateRef<any>): void {
    this.btnTpl = btnTpl;
  }

  sure(): void {
    this.drawerRef
      .getContentComponent()
      .getCurrentValue()
      .pipe(
        tap(modalValue => {
          if (!modalValue) {
            return of(false);
          } else {
            return this.drawerRef.close({ status: ModalBtnStatus.Ok, modalValue });
          }
        })
      )
      .subscribe();
  }

  cancel(): void {
    this.drawerRef.close({ status: ModalBtnStatus.Cancel, value: null });
  }
}
