import { Component } from '@angular/core';

@Component({
  selector: 'app-no-content',
  standalone: true,
  imports: [],
  template: `
    <div class="full-with center sp-18" style="height: 500px">还没想好做什么页面，欢迎pr!</div>
  `
})
export class NoContentComponent {}
