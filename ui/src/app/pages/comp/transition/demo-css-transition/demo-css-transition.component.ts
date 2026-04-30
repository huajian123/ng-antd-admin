import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-demo-css-transition',
  templateUrl: './demo-css-transition.component.html',
  styleUrl: './demo-css-transition.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzButtonModule, NzCardModule, NzGridModule, NzTagModule, NzDividerModule]
})
export class DemoCssTransitionComponent {
  expanded = signal(false);
  highlighted = signal(false);
  moved = signal(false);

  toggleExpand(): void {
    this.expanded.update(v => !v);
  }

  toggleHighlight(): void {
    this.highlighted.update(v => !v);
  }

  toggleMove(): void {
    this.moved.update(v => !v);
  }
}
