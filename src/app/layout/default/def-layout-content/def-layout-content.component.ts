import {Component, OnInit, ChangeDetectionStrategy, Output, Input, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import {SettingInterface, ThemeService} from '../../../core/services/store/theme.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {SplitNavStoreService} from '../../../core/services/store/split-nav-store/split-nav-store.service';

@Component({
  selector: 'app-def-layout-content',
  templateUrl: './def-layout-content.component.html',
  styleUrls: ['./def-layout-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefLayoutContentComponent implements OnInit, OnDestroy {
  private destory$ = new Subject<void>();
  showChats = true;
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  // 混合模式下，判断顶部菜单是否有子菜单，如果没有子菜单，要隐藏左侧菜单
  mixiModeHasLeftNav = this.splitNavStoreService.getSplitLeftNavArrayStore();
  themesOptions: SettingInterface = {
    theme: 'dark',
    color: '',
    mode: 'side',
    fixedWidth: false,
    splitNav: false,
    colorWeak: false,
    fixedHead: false,
    fixedLeftNav: false,
    hasTopArea: true,
    hasFooterArea: true,
    hasNavArea: true,
    hasNavHeadArea: true,
  };
  isCollapsed$: Observable<boolean> = this.themesService.getIsCollapsed();
  isOverMode$: Observable<boolean> = this.themesService.getIsOverMode();
  isMixiMode = false;
  isFixedLeftNav = false;
  visibleSettingDrawer = false;

  constructor(private themesService: ThemeService, private cdr: ChangeDetectorRef, private splitNavStoreService: SplitNavStoreService) {
  }

  changeCollapsed(isCollapsed: boolean): void {
    this.themesService.setIsCollapsed(isCollapsed);
  }

  getThemeOptions(): void {
    this.themesOptions$.pipe(takeUntil(this.destory$)).subscribe(res => {
      this.themesOptions = res;
      this.isMixiMode = res.mode === 'mixi';
      this.isFixedLeftNav=this.themesOptions.fixedLeftNav;
    });
  }

  changeSettingDrawer(): void {
    this.visibleSettingDrawer = !this.visibleSettingDrawer;
  }

  ngOnInit(): void {
    this.getThemeOptions();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

}
