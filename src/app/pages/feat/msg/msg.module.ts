import {NgModule} from '@angular/core';

import {MsgRoutingModule} from './msg-routing.module';
import {MsgComponent} from './msg.component';
import {SharedModule} from "@shared/shared.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    MsgComponent
  ],
    imports: [
        SharedModule,
        MsgRoutingModule,
        MatIconModule
    ]
})
export class MsgModule {
}
