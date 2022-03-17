import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/* observe destroy服务*/
@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
