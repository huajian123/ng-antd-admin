import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinService {
  $globalSpinStore = signal(false);
}
