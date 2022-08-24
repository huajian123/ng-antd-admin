import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '@shared/shared.module';

import { MsgRoutingModule } from './msg-routing.module';
import { MsgComponent } from './msg.component';

@NgModule({
  declarations: [MsgComponent],
  imports: [SharedModule, MsgRoutingModule, MatIconModule]
})
export class MsgModule {}
