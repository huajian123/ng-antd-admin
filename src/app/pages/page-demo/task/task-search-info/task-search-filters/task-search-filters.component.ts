import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-task-search-filters',
  standalone: true,
  imports: [CommonModule, NzListModule, NzTypographyModule, NzAvatarModule],
  templateUrl: './task-search-filters.component.html',
  styleUrls: ['./task-search-filters.component.less']
})
export class TaskSearchFiltersComponent {
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.'
  ];
}
