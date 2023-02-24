import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from '@shared/shared.module';

import { MsgRoutingModule } from './msg-routing.module';
import { MsgComponent } from './msg.component';

@NgModule({
    imports: [SharedModule, MsgRoutingModule, MatIconModule, MsgComponent]
})
export class MsgModule {}
