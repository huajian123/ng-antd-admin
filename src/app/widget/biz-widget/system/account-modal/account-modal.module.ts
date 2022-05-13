import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountModalComponent} from './account-modal.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    AccountModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AccountModalModule {
}
