import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdDirective} from './ad.directive';
import {ScreenLessHiddenDirective} from './screen-less-hidden.directive';
import { LayoutHeadBgDirective } from './layout-head-bg.directive';

const DIRECTIVES = [ AdDirective, ScreenLessHiddenDirective,LayoutHeadBgDirective];

@NgModule({
  declarations: [...DIRECTIVES ],
  imports: [
    CommonModule
  ],
    exports: [...DIRECTIVES]
})
export class DirectivesModule {
}
