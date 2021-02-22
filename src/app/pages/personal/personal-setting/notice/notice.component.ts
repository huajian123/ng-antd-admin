import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoticeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
