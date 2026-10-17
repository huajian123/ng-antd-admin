import { Component, OnInit, input } from '@angular/core';

import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-safe',
  templateUrl: './safe.component.html',

  imports: [NzListModule]
})
export class SafeComponent implements OnInit {
  readonly data = input.required<{
    label: string;
  }>();

  ngOnInit(): void {
    console.log(this.data);
  }
}
