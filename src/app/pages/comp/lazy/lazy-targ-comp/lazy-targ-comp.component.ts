import { Component, OnInit, ChangeDetectionStrategy, NgModule, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { DestroyService } from '@core/services/common/destory.service';
import { SharedModule } from '@shared/shared.module';

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
  providers: [DestroyService]
})
export class LazyTargCompComponent implements OnInit, OnChanges {
  @Input() purChoosePeople: LazySelPeopleEnum = LazySelPeopleEnum.YiLin;
  @Output() readonly currentPeople = new EventEmitter<LazySelPeopleEnum>();
  lazySelPeopleEnum = LazySelPeopleEnum;
  disabled = true;

  constructor(public destroy$: DestroyService) {}

  // 选择明星
  choosePeople(people: LazySelPeopleEnum): void {
    this.purChoosePeople = people;
    this.currentPeople.next(people);
    this.disabled = false;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}

@NgModule({
  declarations: [LazyTargCompComponent],
  imports: [SharedModule]
})
class LazyTargCompModule {}
