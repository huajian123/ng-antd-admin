import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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

  constructor() {}

  ngOnInit(): void {}
}
