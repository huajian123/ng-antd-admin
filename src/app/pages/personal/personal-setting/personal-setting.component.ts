import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver, ChangeDetectorRef} from '@angular/core';
import {AdDirective} from '../../../share/directives/ad.directive';
import {AdComponent, DynamicComponent} from '../../../core/services/types';
import {BaseComponent} from './base/base.component';
import {SafeComponent} from './safe/safe.component';
import {BindComponent} from './bind/bind.component';
import {NoticeComponent} from './notice/notice.component';
import {BreakpointObserver} from '@angular/cdk/layout';
import {NzMenuModeType} from 'ng-zorro-antd/menu/menu.types';

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
  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;
  tabModel: NzMenuModeType = 'inline';
  settingComponent: TabInterface[] = [
    {key: 'base', component: new DynamicComponent(BaseComponent, {label: '基本设置'})},
    {key: 'safe', component: new DynamicComponent(SafeComponent, {label: '安全设置'})},
    {key: 'bind', component: new DynamicComponent(BindComponent, {label: '账号绑定'})},
    {key: 'notice', component: new DynamicComponent(NoticeComponent, {label: '新消息通知'})},
  ];
  menus: Array<{ key: string; title: string; selected?: boolean }> = [
    {
      key: 'base',
      title: '基本设置',
      selected: true,
    },
    {
      key: 'safe',
      title: '安全设置',
      selected: false,
    },
    {
      selected: false,
      key: 'bind',
      title: '账号绑定',
    },
    {
      selected: false,
      key: 'notice',
      title: '新消息通知',
    },
  ];
  currentTitle: string = this.menus[0].title;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {
  }

  to(item: { key: string; title: string; selected?: boolean }): void {
    const selMenu = this.settingComponent.find(({key}) => {
      return key === item.key;
    });
    this.currentTitle = selMenu!.component.data.label;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(selMenu!.component.component);
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<AdComponent>(componentFactory);
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
