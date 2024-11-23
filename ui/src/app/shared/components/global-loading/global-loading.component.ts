import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-global-loading',
  standalone: true,
  imports: [],
  template: `
    <div class="screen-full-height screen-full-width center">
      <div id="globalLoader" class="global-loader">
        <h1>loading...</h1>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalLoadingComponent {}
