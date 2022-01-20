import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LockWidgetComponent} from './lock-widget.component';
import {SHARED_ZORRO_MODULES} from "@shared/shared-zorro.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    LockWidgetComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SHARED_ZORRO_MODULES,
  ]
})
export class LockWidgetModule {
}
