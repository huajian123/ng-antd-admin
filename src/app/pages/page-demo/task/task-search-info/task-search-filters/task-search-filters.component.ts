import { Component } from '@angular/core';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-task-search-filters',
  standalone: true,
  imports: [NzListModule, NzTypographyModule, NzAvatarModule, NzIconModule],
  templateUrl: './task-search-filters.component.html',
  styleUrls: ['./task-search-filters.component.less']
})
export class TaskSearchFiltersComponent {
  data1 = [
    {
      color: 'red',
      title: 'Meetings'
    },
    {
      color: 'green',
      title: 'Devops'
    },
    {
      color: 'yellow',
      title: 'Frontend'
    },
    {
      color: 'blue',
      title: 'Architecture'
    },
    {
      color: 'pink',
      title: 'API'
    },
    {
      color: 'orange',
      title: 'Issues'
    },
    {
      color: 'purple',
      title: 'Features'
    },
    {
      color: 'red',
      title: 'Other'
    }
  ];

  data2 = ['John Belinda', 'Reta Collen', 'Elizabeth Mozelle', 'Marys Rob', 'Adoree Morgan'];
  data3 = ['2020-Q2', '2020-Q1', '2019-Q4', '2019-Q3'];
}
