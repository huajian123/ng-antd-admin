import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BaseRoutingModule} from './base-routing.module';
import {BaseComponent} from './base.component';
import {SharedModule} from '../../../share/shared.module';
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [BaseComponent],
    imports: [
        CommonModule,
        SharedModule,
        BaseRoutingModule,
        DragDropModule
    ]
})
export class BaseModule {
}
