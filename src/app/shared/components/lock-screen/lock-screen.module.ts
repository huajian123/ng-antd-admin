import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '@shared/pipes/pipes.module';
import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';

import { LockScreenComponent } from './lock-screen.component';

@NgModule({
  declarations: [LockScreenComponent],
  exports: [LockScreenComponent],
  imports: [FormsModule, ReactiveFormsModule, PipesModule, SHARED_ZORRO_MODULES, CommonModule]
})
export class LockScreenModule {}
