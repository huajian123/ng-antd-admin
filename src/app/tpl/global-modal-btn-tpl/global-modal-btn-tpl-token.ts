// https://netbasal.com/getting-to-know-the-createcomponent-api-in-angular-22fb115f08e2
// https://angular.io/api/core/createComponent
import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, inject, InjectionToken } from '@angular/core';

import { GlobalModalBtnTplComponent } from '@app/tpl/global-modal-btn-tpl/global-modal-btn-tpl.component';

/**
 * 全局对话框右上角，拓展最大化功能模板
 */
export const GLOBAL_TPL_MODAL_ACTION_TOKEN = new InjectionToken<ComponentRef<GlobalModalBtnTplComponent>>('modal action btn token', {
  providedIn: 'root',
  factory: () => {
    const appRef = inject(ApplicationRef);
    const injector = inject(EnvironmentInjector);

    const componentRef = createComponent(GlobalModalBtnTplComponent, {
      environmentInjector: injector
    });
    // 使用 `ApplicationRef` 实例注册新创建的 ref将组件视图包含到变更检测周期中。
    appRef.attachView(componentRef.hostView);
    return componentRef;
  }
});
