import { Directive, DestroyRef, inject, signal } from '@angular/core';

import screenfull from 'screenfull';

@Directive({
  selector: '[appToggleFullscreen]',
  exportAs: 'appToggleFullscreen',
  host: {
    '(click)': 'onClick()'
  }
})
export class ToggleFullscreenDirective {
  readonly isFullscreenFlag = signal(true);

  constructor() {
    const handler = () => this.isFullscreenFlag.update(v => !v);
    screenfull.on('change', handler);
    inject(DestroyRef).onDestroy(() => screenfull.off('change', handler));
  }

  onClick(): void {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
