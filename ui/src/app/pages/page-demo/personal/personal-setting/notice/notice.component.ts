import { Component, OnInit, ChangeDetectionStrategy, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzListModule } from 'ng-zorro-antd/list';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzListModule, NzSwitchModule, FormsModule]
})
export class NoticeComponent implements OnInit {
  i: {
    password: boolean;
    messages: boolean;
    todo: boolean;
  } = {
    password: true,
    messages: true,
    todo: true
  };
  readonly data = input.required<{
    label: string;
  }>();

  ngOnInit(): void {
    console.log(this.data());
  }
}
