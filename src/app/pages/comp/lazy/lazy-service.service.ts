import { ChangeDetectorRef, Injectable, SimpleChange } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { LazySelPeopleEnum } from '@app/pages/comp/lazy/lazy-targ-comp/lazy-targ-comp.component';
import { AdDirective } from '@shared/directives/ad.directive';

@Injectable()
export class LazyServiceService {
  _adHost!: AdDirective;
  get adHost(): AdDirective {
    return this._adHost;
  }

  set adHost(value: AdDirective) {
    this._adHost = value;
  }

  constructor(public cdr: ChangeDetectorRef) {}

  async create(selPerson: LazySelPeopleEnum = LazySelPeopleEnum.YiLin): Promise<void> {
    await this.lazyLoadCard(selPerson);
    this.cdr.detectChanges();
  }

  async lazyLoadCard(selPerson: LazySelPeopleEnum = LazySelPeopleEnum.YiLin): Promise<void> {
    const viewContainerRef = this._adHost.viewContainerRef;
    const { LazyTargCompComponent } = await import('./lazy-targ-comp/lazy-targ-comp.component');
    const { instance } = viewContainerRef.createComponent(LazyTargCompComponent);
    instance.purChoosePeople = selPerson;
    instance.currentPeople.pipe(takeUntil(instance.destroy$)).subscribe(() => {
      this.create(instance.purChoosePeople);
    });
    // 实现OnChange钩子
    (instance as any).ngOnChanges({
      purChoosePeople: new SimpleChange(null, instance.purChoosePeople, true)
    });
  }
}
