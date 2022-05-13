import {NgModule} from '@angular/core';
import {IconSelComponent} from './icon-sel.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    IconSelComponent
  ],
  exports: [
    IconSelComponent
  ],
  imports: [
    SharedModule
  ]
})
export class IconSelModule {
}
