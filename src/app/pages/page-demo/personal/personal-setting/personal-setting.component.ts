import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef } from '@angular/core';

import { AdComponent, DynamicComponent } from '@core/services/types';
import { AdDirective } from '@shared/directives/ad.directive';
import { NzMenuModeType } from 'ng-zorro-antd/menu/menu.types';

import { BaseComponent } from './base/base.component';
import { BindComponent } from './bind/bind.component';
import { NoticeComponent } from './notice/notice.component';
import { SafeComponent } from './safe/safe.component';

interface TabInterface {
  key: string;
  component: DynamicComponent;
}

@Component({
  selector: 'app-personal-setting',
  templateUrl: './personal-setting.component.html',
  styleUrls: ['./personal-setting.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalSettingComponent implements OnInit {
  @ViewChild(AdDirective, { static: true }) adHost!: AdDirective;
  tabModel: NzMenuModeType = 'inline';
  settingComponent: TabInterface[] = [
    { key: 'base', component: new DynamicComponent(BaseComponent, { label: 'Cài đặt cơ bản' }) },
    { key: 'safe', component: new DynamicComponent(SafeComponent, { label: 'Cài đặt hệ thống bảo vệ' }) },
    { key: 'bind', component: new DynamicComponent(BindComponent, { label: 'Ràng buộc tài khoản' }) },
    { key: 'notice', component: new DynamicComponent(NoticeComponent, { label: 'Thông báo tin tức mới' }) }
  ];
  menus: Array<{ key: string; title: string; selected?: boolean }> = [
    {
      key: 'base',
      title: 'Cài đặt cơ bản',
      selected: true
    },
    {
      key: 'safe',
      title: 'Cài đặt hệ thống bảo vệ',
      selected: false
    },
    {
      selected: false,
      key: 'bind',
      title: 'Ràng buộc tài khoản'
    },
    {
      selected: false,
      key: 'notice',
      title: 'Thông báo tin tức mới'
    }
  ];
  currentTitle: string = this.menus[0].title;

  constructor(private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {}

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
    this.breakpointObserver.observe(['(max-width: 767px)']).subscribe(result => {
      this.tabModel = result.matches ? 'horizontal' : 'inline';
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    this.to(this.menus[0]);
    this.obBreakPoint();
  }
}
