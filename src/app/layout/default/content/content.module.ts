import {NgModule} from '@angular/core';
import {ContentComponent} from './content.component';
import {DefaultModule} from '../default.module';
import {SideNavModule} from '../side-nav/side-nav.module';


@NgModule({
  declarations: [ContentComponent],
  imports: [
    SideNavModule,
    DefaultModule,
  ],
  exports: [ContentComponent]
})
export class ContentModule {
}
