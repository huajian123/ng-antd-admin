import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, OnChanges, inject, DestroyRef } from '@angular/core';

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
  standalone: true,
  imports: [NzCardModule, NzAvatarModule, NzButtonModule, NzWaveModule]
})
export class LazyTargCompComponent implements OnChanges {
  @Input() purChoosePeople: LazySelPeopleEnum = LazySelPeopleEnum.YiLin;
  @Output() readonly currentPeople = new EventEmitter<LazySelPeopleEnum>();
  lazySelPeopleEnum = LazySelPeopleEnum;
  disabled = true;
  destroyRef = inject(DestroyRef);

  // 选择明星
  choosePeople(people: LazySelPeopleEnum): void {
    this.purChoosePeople = people;
    this.currentPeople.next(people);
    this.disabled = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
