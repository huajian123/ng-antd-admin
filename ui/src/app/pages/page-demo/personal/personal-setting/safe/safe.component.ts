import { Component, OnInit, ChangeDetectionStrategy, input } from '@angular/core';

import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-safe',
  templateUrl: './safe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
