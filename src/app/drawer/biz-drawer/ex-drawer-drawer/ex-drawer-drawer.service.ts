import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DrawerWrapService } from '@app/drawer/base-drawer';
import { ExDrawerDrawerComponent } from '@app/drawer/biz-drawer/ex-drawer-drawer/ex-drawer-drawer.component';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzDrawerOptions } from 'ng-zorro-antd/drawer';

@Injectable({
  providedIn: 'root'
})
export class ExDrawerDrawerService {
  private drawerWrapService = inject(DrawerWrapService);

  protected getContentComponent(): NzSafeAny {
    return ExDrawerDrawerComponent;
  }

  public show(options: NzDrawerOptions = {}, params?: object): Observable<NzSafeAny> {
    return this.drawerWrapService.show(this.getContentComponent(), options, params);
  }
}
