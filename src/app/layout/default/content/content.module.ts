import {NgModule} from '@angular/core';
import {ContentComponent} from './content.component';
import {DefaultModule} from '../default.module';
import {SideNavModule} from '../side-nav/side-nav.module';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [ContentComponent],
  imports: [
    SharedModule,
    SideNavModule,
    DefaultModule,
  ],
  exports: [ContentComponent]
})
export class ContentModule {
}
