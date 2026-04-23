import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SharedSignalService {
  readonly $sharedValue = signal('初始共享值');
}
