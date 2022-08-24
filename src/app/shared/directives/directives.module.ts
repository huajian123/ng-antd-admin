import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NamedTemplate } from '@shared/directives/named-template';
import { TrackByPropertyDirective } from '@shared/directives/track-by-property.directive';

import { AdDirective } from './ad.directive';
import { AuthDirective } from './auth.directive';
import { DebounceClickDirective } from './debounceClick.directive';
import { DisabledDirective } from './disabled.directive';
import { MouseHoverShowDirective } from './mouse-hover-show.directive';
import { ScreenLessHiddenDirective } from './screen-less-hidden.directive';
import { ToggleFullscreenDirective } from './toggle-fullscreen.directive';

const DIRECTIVES = [
  NamedTemplate,
  MouseHoverShowDirective,
  TrackByPropertyDirective,
  ToggleFullscreenDirective,
  DisabledDirective,
  DebounceClickDirective,
  AdDirective,
  ScreenLessHiddenDirective,
  AuthDirective
];

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [CommonModule],
  exports: [...DIRECTIVES]
})
export class DirectivesModule {}
