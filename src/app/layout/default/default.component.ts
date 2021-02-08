import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ThemeService} from '../../core/services/store/theme.service';
import {WindowService} from '../../core/services/common/window.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SimpleReuseStrategy} from '../../core/services/common/reuse-strategy';
import {TabService} from '../../core/services/common/tab.service';
import {fnFormatePath} from '../../utils/tools';

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
              private router: Router, private tabService: TabService,
              private activatedRoute: ActivatedRoute) {
  }


  changeCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    this.themesService.setIsCollapsed(this.isCollapsed);
  }

  // 退出登陆
  goLogin(): void {
    this.windowServe.clearStorage();
    this.tabService.clearTabs();
    SimpleReuseStrategy.handlers = {};
    // @ts-ignore
    SimpleReuseStrategy.waitDelete = fnFormatePath(this.activatedRoute.snapshot['_routerState'].url);
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.themesService.getThemesMode().subscribe(res => {
      this.themeOptions.mode = res.mode;
    });
    this.themesService.getIsCollapsed().subscribe(res => this.isCollapsed = res);
  }

}
