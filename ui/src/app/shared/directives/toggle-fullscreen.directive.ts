import { ChangeDetectorRef, Directive, inject, OnInit } from '@angular/core';

import screenfull from 'screenfull';

@Directive({
  selector: '[appToggleFullscreen]',
  exportAs: 'appToggleFullscreen',
  standalone: true,
  host: {
    '(click)': 'onClick()'
  }
})
export class ToggleFullscreenDirective implements OnInit {
  isFullscreenFlag = true;
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    screenfull.onchange(() => {
      setTimeout(() => {
        this.isFullscreenFlag = !this.isFullscreenFlag;
        this.cdr.markForCheck();
      }, 10);
    });
  }

  onClick(): void {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
