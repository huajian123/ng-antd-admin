import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdDirective} from './ad.directive';
import {ScreenLessHiddenDirective} from './screen-less-hidden.directive';
import {AuthDirective} from "./auth.directive";
import {DebounceClickDirective} from "./debounceClick.directive";
import {DisabledDirective} from "./disabled.directive";
import {ToggleFullscreenDirective} from './toggle-fullscreen.directive';
import {TrackByPropertyDirective} from "@shared/directives/track-by-property.directive";
import {MouseHoverShowDirective} from './mouse-hover-show.directive';

const DIRECTIVES = [MouseHoverShowDirective, TrackByPropertyDirective, ToggleFullscreenDirective, DisabledDirective, DebounceClickDirective, AdDirective, ScreenLessHiddenDirective, AuthDirective];

@NgModule({
  declarations: [...DIRECTIVES,],
  imports: [
    CommonModule
  ],
  exports: [...DIRECTIVES,]
})
export class DirectivesModule {
}
