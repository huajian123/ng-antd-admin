import {NgModule} from '@angular/core';
import {DefLayoutContentComponent} from './def-layout-content.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [DefLayoutContentComponent],
  imports: [
    SharedModule
  ],
  exports: [DefLayoutContentComponent]
})
export class DefLayoutContentModule {
}
