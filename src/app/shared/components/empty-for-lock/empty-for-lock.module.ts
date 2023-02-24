import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EmptyForLockRoutingModule } from './empty-for-lock-routing.module';
import { EmptyForLockComponent } from './empty-for-lock.component';

@NgModule({
    imports: [CommonModule, EmptyForLockRoutingModule, EmptyForLockComponent]
})
export class EmptyForLockModule {}
