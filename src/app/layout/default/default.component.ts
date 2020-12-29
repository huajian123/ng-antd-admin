import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ThemeService} from '../../core/services/store/theme.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent implements OnInit {
  themeOptions = {
    mode: 'side'
  };

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

  constructor(private themesService: ThemeService) {
  }

  ngOnInit(): void {
    this.themesService.getThemesMode().subscribe(res => {
      this.themeOptions.mode = res.mode;
    });
  }

}
