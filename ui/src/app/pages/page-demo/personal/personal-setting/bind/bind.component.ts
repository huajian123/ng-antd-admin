import { Component, OnInit, input } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrl: './bind.component.less',

  imports: [NzListModule, NzIconModule, NzButtonModule]
})
export class BindComponent implements OnInit {
  readonly data = input.required<{
    label: string;
  }>();

  ngOnInit(): void {
    console.log(this.data);
  }
}
