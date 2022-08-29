import { ChangeDetectorRef, inject, ViewRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OperatorFunction, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/*https://github.com/angular/angular/issues/46119*/
/*  V14版本才可以使用，低于V14必须使用src/app/core/services/common/destory.service.ts提供的服务
 *   destroy$=untilDestroyedFn();
 *
 *    someObserve.pipe(this.destroy$).subscribe()
 * */
const untilDestroyedFn = function untilDestroyed(): OperatorFunction<any, any> {
  const subject = new Subject<void>();
  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  viewRef.onDestroy(() => {
    subject.next();
    subject.complete();
  });

  return takeUntil(subject.asObservable());
};

// 获取路由参数
const getRouteParamFn = function getRouteParam(key: string): string {
  return inject(ActivatedRoute).snapshot.params[key];
};

export { untilDestroyedFn, getRouteParamFn };
