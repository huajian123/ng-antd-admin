import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InterAddEditComponent} from './inter-add-edit/inter-add-edit.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [InterAddEditComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    InterAddEditComponent
  ]
})
export class InternalManageWidgetModule {
}
