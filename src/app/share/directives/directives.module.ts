import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthDirective} from './auth.directive';

const DIRECTIVES = [AuthDirective];

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [
    CommonModule
  ],
  exports: [...DIRECTIVES]
})
export class DirectivesModule {
}
