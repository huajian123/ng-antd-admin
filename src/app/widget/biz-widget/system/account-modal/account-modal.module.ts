import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { AccountModalComponent } from './account-modal.component';

@NgModule({
    imports: [SharedModule, AccountModalComponent]
})
export class AccountModalModule {}
