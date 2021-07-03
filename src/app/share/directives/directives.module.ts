import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthDirective} from './auth.directive';
import {AdDirective} from './ad.directive';
import {ScreenLessHiddenDirective} from './screen-less-hidden.directive';

const DIRECTIVES = [AuthDirective, AdDirective, ScreenLessHiddenDirective];

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [
    CommonModule
  ],
  exports: [...DIRECTIVES]
})
export class DirectivesModule {
}
