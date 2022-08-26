import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
