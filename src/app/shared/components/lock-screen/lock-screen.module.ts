import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LockScreenComponent} from './lock-screen.component';
import {SHARED_ZORRO_MODULES} from "@shared/shared-zorro.module";
import {PipesModule} from "@shared/pipes/pipes.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LockScreenComponent
  ],
  exports: [
    LockScreenComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    SHARED_ZORRO_MODULES,
    CommonModule
  ]
})
export class LockScreenModule {
}
