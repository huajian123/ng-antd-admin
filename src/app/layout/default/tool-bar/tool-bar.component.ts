import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolBarComponent implements OnInit {
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

  constructor() {
  }

  ngOnInit(): void {
  }

}
