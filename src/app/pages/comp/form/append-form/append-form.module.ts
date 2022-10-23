import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AppendFormModalModule } from '@widget/biz-widget/form/append-form-modal/append-form-modal.module';

import { AppendFormRoutingModule } from './append-form-routing.module';
import { AppendFormComponent } from './append-form.component';

@NgModule({
  declarations: [AppendFormComponent],
  imports: [SharedModule, AppendFormModalModule, AppendFormRoutingModule]
})
export class AppendFormModule {}
