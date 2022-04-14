import { Injectable } from '@angular/core';
import {DrawerWrapService} from "@app/drawer/base-drawer";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {NzDrawerOptions} from "ng-zorro-antd/drawer";
import {ExDrawerDrawerComponent} from "@app/drawer/biz-drawer/ex-drawer-drawer/ex-drawer-drawer.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExDrawerDrawerService {

  constructor(private drawerWrapService: DrawerWrapService) {
  }

  protected getContentComponent(): NzSafeAny {
    return ExDrawerDrawerComponent;
  }

  public show(options: NzDrawerOptions = {}, params?: object) : Observable<NzSafeAny> {
    return this.drawerWrapService.show(this.getContentComponent(), options, params)
  }
}
