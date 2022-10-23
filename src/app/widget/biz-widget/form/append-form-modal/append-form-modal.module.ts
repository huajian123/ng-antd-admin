import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { AppendFormModalComponent } from './append-form-modal.component';

@NgModule({
  declarations: [AppendFormModalComponent],
  imports: [SharedModule]
})
export class AppendFormModalModule {}
