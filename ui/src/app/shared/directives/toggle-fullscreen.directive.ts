import { Directive, OnInit, signal } from '@angular/core';

import screenfull from 'screenfull';

@Directive({
  selector: '[appToggleFullscreen]',
  exportAs: 'appToggleFullscreen',
  host: {
    '(click)': 'onClick()'
  }
})
export class ToggleFullscreenDirective implements OnInit {
  isFullscreenFlag = signal(true);

  ngOnInit(): void {
    screenfull.onchange(() => {
      this.isFullscreenFlag.update(v => !v);
    });
  }

  onClick(): void {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
