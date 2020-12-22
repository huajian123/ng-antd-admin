import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent implements OnInit {
  layout = {
    collasped: false,
    siderMode: 'side',
    topMode(): boolean {
      return this.siderMode !== 'over' && this.setting.mode === 'top';
    },
    setting: {
      theme: 'dark',
      color: 'daybreak',
      mode: 'side',
      fixedWidth: false,
      colorweak: false
    }
  };
  constructor() { }

  ngOnInit(): void {
  }

}
