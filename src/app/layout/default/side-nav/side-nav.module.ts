import {NgModule} from '@angular/core';
import {SideNavComponent} from './side-nav.component';
import {SharedModule} from '../../../share/shared.module';



@NgModule({
  declarations: [SideNavComponent],
  imports: [
    SharedModule
  ],
  exports: [
    SideNavComponent
  ]
})
export class SideNavModule {
}
