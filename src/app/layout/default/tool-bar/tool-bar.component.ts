import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  template: `
    <div class="app-header">
      <ng-content select="ng-container[left]" />
      <ng-content select="ng-container[right]" />
    </div>
  `,
  styleUrls: ['./tool-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class ToolBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
