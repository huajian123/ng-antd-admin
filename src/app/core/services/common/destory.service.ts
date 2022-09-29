import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/* observe destroy服务*/
/* 使用方式：*/
/*
      @Component({
        selector: 'app-search-route',
        templateUrl: './search-route.component.html',
        styleUrls: ['./search-route.component.less'],
        changeDetection: ChangeDetectionStrategy.OnPush,
        providers: [DestroyService]
      })

 *   constructor( private destroy$: DestroyService ) {}
 *    some$.pipe( takeUntil(this.destroy$)).subscribe(...)
 *
 * */

@Injectable()
export class DestroyService extends Subject<void> implements OnDestroy {
  ngOnDestroy(): void {
    this.next();
    this.complete();
  }
}
