import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  NgModule,
  Input,
  Output,
  EventEmitter,
  OnDestroy, SimpleChanges
} from '@angular/core';
import {SharedModule} from "@shared/shared.module";
import {Subject} from "rxjs";
import {DestroyService} from "@core/services/common/destory.service";

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
  providers: [DestroyService],
})
export class LazyTargCompComponent implements OnInit {
  @Input() purChoosePeople: LazySelPeopleEnum = LazySelPeopleEnum.YiLin;
  @Output() currentPeople = new EventEmitter<LazySelPeopleEnum>();
  lazySelPeopleEnum = LazySelPeopleEnum;
  disabled = true;

  constructor(public destroy$: DestroyService,) {
  }

  // 选择明星
  choosePeople(people: LazySelPeopleEnum): void {
    this.purChoosePeople = people;
    this.currentPeople.next(people);
    this.disabled = false;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}

@NgModule({
  declarations: [LazyTargCompComponent],
  imports: [SharedModule]
})
class LazyTargCompModule {
}
