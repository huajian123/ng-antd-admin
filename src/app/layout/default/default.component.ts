import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ThemeService} from '../../core/services/store/theme.service';
import {WindowService} from '../../core/services/common/window.service';
import {Router} from '@angular/router';

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

  themeOptions$ = this.themesService.getThemesMode();
  isCollapsed = false;
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

  constructor(private themesService: ThemeService, private windowServe: WindowService,
              private router: Router) {
  }


  changeCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.themesService.setIsCollapsed(this.isCollapsed);
  }

  // 退出登陆
  goLogin(): void {
    this.windowServe.clearStorage();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.themesService.getThemesMode().subscribe(res => {
      this.themeOptions.mode = res.mode;
    });
    this.themesService.getIsCollapsed().subscribe(res => this.isCollapsed = res);
  }

}
