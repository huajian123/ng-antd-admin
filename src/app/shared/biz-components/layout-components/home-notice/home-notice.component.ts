import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home-notice',
  templateUrl: './home-notice.component.html',
  styleUrls: ['./home-notice.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeNoticeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
