import { Component, ChangeDetectionStrategy, SimpleChanges, OnChanges, inject, DestroyRef, input, computed, output } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

export enum LazySelPeopleEnum {
  'Yanzu',
  'Dehua',
  'YiLin',
  'Jielun'
}

@Component({
  selector: 'app-lazy-targ-comp',
  templateUrl: './lazy-targ-comp.component.html',
  styleUrls: ['./lazy-targ-comp.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzCardModule, NzAvatarModule, NzButtonModule, NzWaveModule]
})
export class LazyTargCompComponent implements OnChanges {
  readonly purChoosePeople = input<LazySelPeopleEnum>(LazySelPeopleEnum.YiLin);
  _purChoosePeople = computed(() => this.purChoosePeople());
  readonly currentPeople = output<LazySelPeopleEnum>();
  lazySelPeopleEnum = LazySelPeopleEnum;
  disabled = true;
  destroyRef = inject(DestroyRef);

  // 选择明星
  choosePeople(people: LazySelPeopleEnum): void {
    this.currentPeople.emit(people);
    this.disabled = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
