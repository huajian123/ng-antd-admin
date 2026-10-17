import { Component } from '@angular/core';

@Component({
  selector: 'app-global-loading',
  imports: [],
  template: `
    <div class="screen-full-height screen-full-width center">
      <div id="globalLoader" class="global-loader">
        <h1>loading...</h1>
      </div>
    </div>
  `
})
export class GlobalLoadingComponent {}
