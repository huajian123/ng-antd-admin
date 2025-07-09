import { ChangeDetectorRef, inject, Injectable } from '@angular/core';

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

  cdr = inject(ChangeDetectorRef);

  async create(selPerson: LazySelPeopleEnum = LazySelPeopleEnum.YiLin): Promise<void> {
    await this.lazyLoadCard(selPerson);
    this.cdr.detectChanges();
  }

  async lazyLoadCard(selPerson: LazySelPeopleEnum = LazySelPeopleEnum.YiLin): Promise<void> {
    const viewContainerRef = this._adHost.viewContainerRef;
    const { LazyTargCompComponent } = await import('./lazy-targ-comp/lazy-targ-comp.component');
    const componentRef = viewContainerRef.createComponent(LazyTargCompComponent);
    // 使用setInput api可以被onchange钩子管理
    componentRef.setInput('purChoosePeople', selPerson);
    componentRef.instance.currentPeople.subscribe(currentPeople => {
      this.create(currentPeople);
    });
  }
}
