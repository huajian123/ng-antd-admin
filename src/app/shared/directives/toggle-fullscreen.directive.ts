import { ChangeDetectorRef, Directive, HostListener, OnInit } from '@angular/core';

import screenfull from 'screenfull';

@Directive({
  selector: '[appToggleFullscreen]',
  exportAs: 'appToggleFullscreen'
})
export class ToggleFullscreenDirective implements OnInit {
  isFullscreenFlag = true;
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    screenfull.onchange(() => {
      setTimeout(() => {
        this.isFullscreenFlag = !this.isFullscreenFlag;
        this.cdr.markForCheck();
      }, 10);
    });
  }

  @HostListener('click') onClick() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
