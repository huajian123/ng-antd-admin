import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { DetailComponent } from './detail/detail.component';
import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';

@NgModule({
  declarations: [TabsComponent, DetailComponent],
  imports: [SharedModule, TabsRoutingModule]
})
export class TabsModule {}
