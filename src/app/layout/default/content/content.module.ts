import {NgModule} from '@angular/core';
import {ContentComponent} from './content.component';
import {DefaultModule} from '../default.module';
import {SideNavModule} from '../side-nav/side-nav.module';
import {ShareModule} from '../../../share/share.module';


@NgModule({
  declarations: [ContentComponent],
  imports: [
    ShareModule,
    SideNavModule,
    DefaultModule,
  ],
  exports: [ContentComponent]
})
export class ContentModule {
}
