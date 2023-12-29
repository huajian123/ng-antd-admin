// https://netbasal.com/getting-to-know-the-createcomponent-api-in-angular-22fb115f08e2
// https://angular.io/api/core/createComponent
import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, inject, InjectionToken, TemplateRef } from '@angular/core';

import { GlobalDrawerFootTplComponent } from '@app/tpl/global-drawer-foot-tpl/global-drawer-foot-tpl.component';
import { GlobalModalBtnTplComponent } from '@app/tpl/global-modal-btn-tpl/global-modal-btn-tpl.component';

/**
 * 全局抽屉的footer模板，也就是确定，取消按钮啦
 */
export const GLOBAL_DRAWER_FOOT_TPL_TOKEN = new InjectionToken<ComponentRef<GlobalDrawerFootTplComponent>>('drawer action btn token', {
  providedIn: 'root',
  factory: () => {
    const appRef = inject(ApplicationRef);
    const injector = inject(EnvironmentInjector);

    const componentRef = createComponent(GlobalDrawerFootTplComponent, {
      environmentInjector: injector
    });
    // 使用 `ApplicationRef` 实例注册新创建的 ref将组件视图包含到变更检测周期中。
    appRef.attachView(componentRef.hostView);
    return componentRef;
  }
});
