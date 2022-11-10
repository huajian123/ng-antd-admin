import { Observable, combineLatest, MonoTypeOperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function mapTimeStamp<TData = any>(): MonoTypeOperatorFunction<TData[]> {
  return map((items: TData[]) =>
    items.map((item) => ({
      ...item
    }))
  );
}

export function vmFromLatest<TVm extends {}, TComputedVm extends {} = any>(
  vmBase: { [K in keyof TVm]: Observable<TVm[K]> },
  manipulateFunction?: (vmBaseReturn: TVm) => TComputedVm
): Observable<TVm & TComputedVm> {
  return combineLatest(Object.values(vmBase)).pipe(
    map((responses) => {
      const returnVm = Object.keys(vmBase).reduce((vm, key, index) => {
        vm[key] = responses[index];
        return vm;
      }, {} as TVm);

      if (manipulateFunction) {
        const manipulatedVm = manipulateFunction(returnVm);
        return Object.assign(returnVm, manipulatedVm) as TVm & TComputedVm;
      }

      return returnVm as TVm & TComputedVm;
    })
  );
}
