import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AdComponent, DynamicComponent } from '@core/services/types';
import { AdDirective } from '@shared/directives/ad.directive';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModeType, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { BaseComponent } from './base/base.component';
import { BindComponent } from './bind/bind.component';
import { NoticeComponent } from './notice/notice.component';
import { SafeComponent } from './safe/safe.component';
import { AdDirective as AdDirective_1 } from '../../../../shared/directives/ad.directive';

interface TabInterface {
  key: string;
  component: DynamicComponent;
}

@Component({
  selector: 'app-personal-setting',
  templateUrl: './personal-setting.component.html',
  styleUrls: ['./personal-setting.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzCardModule, NgClass, NzMenuModule, NzButtonModule, NzGridModule, NzTypographyModule, AdDirective_1]
})
export class PersonalSettingComponent implements OnInit {
  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
  tabModel: NzMenuModeType = 'inline';
  settingComponent: TabInterface[] = [
    { key: 'base', component: new DynamicComponent(BaseComponent, { label: '基本设置' }) },
    { key: 'safe', component: new DynamicComponent(SafeComponent, { label: '安全设置' }) },
    { key: 'bind', component: new DynamicComponent(BindComponent, { label: '账号绑定' }) },
    { key: 'notice', component: new DynamicComponent(NoticeComponent, { label: '新消息通知' }) }
  ];
  destroyRef = inject(DestroyRef);
  menus: Array<{ key: string; title: string; selected?: boolean }> = [
    {
      key: 'base',
      title: '基本设置',
      selected: true
    },
    {
      key: 'safe',
      title: '安全设置',
      selected: false
    },
    {
      selected: false,
      key: 'bind',
      title: '账号绑定'
    },
    {
      selected: false,
      key: 'notice',
      title: '新消息通知'
    }
  ];
  currentTitle: string = this.menus[0].title;

  private breakpointObserver = inject(BreakpointObserver);
  private cdr = inject(ChangeDetectorRef);

  to(item: { key: string; title: string; selected?: boolean }): void {
    const selMenu = this.settingComponent.find(({ key }) => {
      return key === item.key;
    });
    this.currentTitle = selMenu!.component.data.label;
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<AdComponent>(selMenu!.component.component);
    componentRef.instance.data = selMenu!.component.data;
  }

  obBreakPoint(): void {
    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.tabModel = result.matches ? 'horizontal' : 'inline';
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.to(this.menus[0]);
    this.obBreakPoint();
  }
}
