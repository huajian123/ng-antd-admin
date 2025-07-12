import { Component } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-task-list-panel',
  imports: [NzCollapseModule, NzCardModule, NzIconModule],
  templateUrl: './task-list-panel.component.html'
})
export class TaskListPanelComponent {
  panels = [
    {
      active: true,
      name: 'Kubernetes cluster meeting last tuesday',
      disabled: false
    }
  ];
}
