import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum EquipmentWidth {
  xs,
  sm,
  md,
  lg,
  xl,
  xxl
}

@Injectable({
  providedIn: 'root'
})
export class WindowsWidthService {
  private windowWidth$ = new BehaviorSubject<EquipmentWidth>(EquipmentWidth.xxl);

  constructor() {}
  setWindowWidthStore(store: EquipmentWidth): void {
    this.windowWidth$.next(store);
  }

  getWindowWidthStore(): Observable<EquipmentWidth> {
    return this.windowWidth$.asObservable();
  }
}
