import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';

import { DefLayoutContentModule } from './def-layout-content/def-layout-content.module';
import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TabComponent } from './tab/tab.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';

@NgModule({
  declarations: [DefaultComponent, TabComponent, SideNavComponent, NavBarComponent, ToolBarComponent, NavDrawerComponent],
  imports: [SharedModule, DefLayoutContentModule, DefaultRoutingModule, NzNoAnimationModule]
})
export class DefaultModule {}
