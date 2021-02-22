import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {AdDirective} from '../../../share/directives/ad.directive';
import {AdComponent, DynamicComponent} from '../../../core/services/types';
import {BaseComponent} from './base/base.component';
import {SafeComponent} from './safe/safe.component';
import {BindComponent} from './bind/bind.component';
import {NoticeComponent} from './notice/notice.component';

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

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
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

  ngOnInit(): void {
    this.to(this.menus[0]);
  }

}
