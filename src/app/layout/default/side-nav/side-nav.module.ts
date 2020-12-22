import {NgModule} from '@angular/core';
import {SideNavComponent} from './side-nav.component';
import {ShareModule} from '../../../share/share.module';



@NgModule({
  declarations: [SideNavComponent],
  imports: [
    ShareModule
  ],
  exports: [
    SideNavComponent
  ]
})
export class SideNavModule {
}
