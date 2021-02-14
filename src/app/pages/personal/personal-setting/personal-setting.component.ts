import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-personal-setting',
  templateUrl: './personal-setting.component.html',
  styleUrls: ['./personal-setting.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalSettingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
