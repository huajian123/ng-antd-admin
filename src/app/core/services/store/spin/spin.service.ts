import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinService {
  private globalSpin$ = new BehaviorSubject<boolean>(false);
  constructor() { }
  // 设置当前loading对象
  setCurrentGlobalSpinStore(isSpinning: boolean): void {
    this.globalSpin$.next(isSpinning);
  }
  getCurrentGlobalSpinStore(): Observable<boolean> {
    return this.globalSpin$.asObservable();
  }

}
