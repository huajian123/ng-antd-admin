import { ComponentRef, DestroyRef, Inject, inject, Injectable, Injector, TemplateRef, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { GLOBAL_DRAWER_FOOT_TPL_TOKEN } from '@app/tpl/global-drawer-foot-tpl/global-drawer-foot-tpl-token';
import { GlobalDrawerFootTplComponentToken } from '@app/tpl/global-drawer-foot-tpl/global-drawer-foot-tpl.component';
import { ModalBtnStatus } from '@widget/base-modal';
import * as _ from 'lodash';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDrawerOptions, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Injectable({ providedIn: 'root' })
export class DrawerWrapService {
  drawerRef!: NzDrawerRef;
  private destroyRef = inject(DestroyRef);
  private baseInjector = inject(Injector);
  private btnComponentRef: ComponentRef<GlobalDrawerFootTplComponentToken> = inject(GLOBAL_DRAWER_FOOT_TPL_TOKEN);
  protected bsDrawerService: NzDrawerService = this.baseInjector.get(NzDrawerService);
  private btnTpl: TemplateRef<any> = this.btnComponentRef.instance.componentTpl;
  constructor() {
    this.btnComponentRef.instance.sureEmitter.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.sure());
    this.btnComponentRef.instance.cancelEmitter.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.cancel());
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
      nzFooter: drawerOptions.nzFooter || this.btnTpl
    };
    return _.merge(defaultOptions, drawerOptions);
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
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  cancel(): void {
    this.drawerRef.close({ status: ModalBtnStatus.Cancel, value: null });
  }
}
