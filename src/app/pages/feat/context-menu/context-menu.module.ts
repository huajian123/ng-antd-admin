import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { ContextMenuRoutingModule } from './context-menu-routing.module';
import { ContextMenuComponent } from './context-menu.component';

@NgModule({
  declarations: [ContextMenuComponent],
  imports: [SharedModule, ContextMenuRoutingModule]
})
export class ContextMenuModule {}
