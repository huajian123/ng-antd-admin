import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ThemeService} from '../../core/services/store/theme.service';
import {WindowService} from '../../core/services/common/window.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SimpleReuseStrategy} from '../../core/services/common/reuse-strategy';
import {TabService} from '../../core/services/common/tab.service';
import {fnFormatePath} from '../../utils/tools';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Subject} from 'rxjs';
import { switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent implements OnInit, OnDestroy {
  isCollapsed$ = this.themesService.getIsCollapsed();
  themeOptions$ = this.themesService.getThemesMode();
  isCollapsed = false;
  isOverMode = false; // 窗口变窄时，导航栏是否变成抽屉模式
  showOverModeNav = false;
  private destory$ = new Subject<void>();

  constructor(private themesService: ThemeService, private windowServe: WindowService,
              private router: Router, private tabService: TabService,
              private activatedRoute: ActivatedRoute, private breakpointObserver: BreakpointObserver) {
  }


  changeCollapsed(): void {
    if (this.isOverMode) {
      this.showOverModeNav = true;
      return;
    }

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
    this.themesService.getIsCollapsed().subscribe(res => this.isCollapsed = res);
    this.themesService.getThemesMode().pipe(switchMap((res) => {
      let maxWidth = '';
      if (res.mode === 'side') {
        maxWidth = '(max-width: 700px)';
      } else if (res.mode === 'top') {
        maxWidth = '(max-width: 1190px)';
      }
      // 可以入参[Breakpoints.Small, Breakpoints.XSmall]
      return this.breakpointObserver.observe([maxWidth]);
    })).subscribe(result => {
      this.isOverMode = result.matches;
      this.themesService.setIsOverMode(this.isOverMode);
      if (this.isOverMode) {
        this.themesService.setIsCollapsed(false);
      }
    });
  }


  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

}
