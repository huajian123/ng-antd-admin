import {Directive, HostListener} from '@angular/core';
import screenfull from "screenfull";

@Directive({
  selector: '[appToggleFullscreen]',
  exportAs: 'appToggleFullscreen'
})
export class ToggleFullscreenDirective {

  isFullscreenFlag = true;

  @HostListener("click") onClick() {
    if (screenfull.isEnabled) {
      screenfull.toggle().then(() => {
        this.isFullscreenFlag = !this.isFullscreenFlag;
      })
    }
  }
}
