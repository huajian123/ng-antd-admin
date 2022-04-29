import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, SimpleChange} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {
  LazySelPeopleEnum,
  LazyTargCompComponent
} from "@app/pages/comp/lazy/lazy-basic/lazy-targ-comp/lazy-targ-comp.component";
import {AdDirective} from "@shared/directives/ad.directive";
import {DestroyService} from "@core/services/common/destory.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-lazy-basic',
  templateUrl: './lazy-basic.component.html',
  styleUrls: ['./lazy-basic.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LazyBasicComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '详情组件示例',
    breadcrumb: ['首页', '组件', '详情组件'],
    desc: '懒加载组件,我永远喜欢蔡依林'
  };
  isStarted = false;
  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

  constructor(public cdr: ChangeDetectorRef,) {
  }

  async create(selPerson: LazySelPeopleEnum = LazySelPeopleEnum.YiLin): Promise<void> {
    await this.lazyLoadCard(selPerson);
    this.isStarted = true;
    this.cdr.markForCheck();
  }

  async lazyLoadCard(selPerson: LazySelPeopleEnum = LazySelPeopleEnum.YiLin) {
    const viewContainerRef = this.adHost.viewContainerRef;
    const {LazyTargCompComponent} = await import('./lazy-targ-comp/lazy-targ-comp.component');
    const {instance} = viewContainerRef.createComponent(LazyTargCompComponent);
    instance.purChoosePeople = selPerson;
    instance.currentPeople.pipe(takeUntil(instance.destroy$)).subscribe(() => {
      this.create(instance.purChoosePeople)
    });
    // 实现OnChange钩子
    (instance as any).ngOnChanges({
      purChoosePeople: new SimpleChange(null, instance.purChoosePeople, true)
    });
  }

  ngOnInit(): void {
  }

}
