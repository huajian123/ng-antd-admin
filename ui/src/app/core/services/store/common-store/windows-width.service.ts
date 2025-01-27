import { Injectable, signal } from '@angular/core';

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
  $windowWidth = signal<EquipmentWidth>(EquipmentWidth.xxl);
}
