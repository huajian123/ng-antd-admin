import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Observable} from "rxjs";
import {SettingInterface, ThemeService} from "@store/theme.service";
import {takeUntil} from "rxjs/operators";
import {SplitNavStoreService} from "@store/split-nav-store/split-nav-store.service";
import {DestroyService} from "@core/services/common/destory.service";

@Component({
  selector: 'app-def-layout-content',
  templateUrl: './def-layout-content.component.html',
  styleUrls: ['./def-layout-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class DefLayoutContentComponent implements OnInit {
  showChats = true;
  isNightTheme$ = this.themesService.getIsNightTheme();
  themesOptions$ = this.themesService.getThemesMode();
  isMixiMode = false;
  themesOptions: SettingInterface = {
    theme: 'dark',
    color: '',
    mode: 'side',
    fixedWidth: false,
    splitNav: false,
    fixedTab: false,
    colorWeak: false,
    fixedHead: false,
    fixedLeftNav: false,
    hasTopArea: true,
    hasFooterArea: true,
    hasNavArea: true,
    hasNavHeadArea: true,
  };
  isFixedLeftNav = false;
  isOverMode$: Observable<boolean> = this.themesService.getIsOverMode();
  isCollapsed$: Observable<boolean> = this.themesService.getIsCollapsed();
  // 混合模式下，判断顶部菜单是否有子菜单，如果没有子菜单，要隐藏左侧菜单
  mixiModeHasLeftNav = this.splitNavStoreService.getSplitLeftNavArrayStore();
  contentMarginTop = '48px';

  constructor(private destroy$: DestroyService, private themesService: ThemeService, private splitNavStoreService: SplitNavStoreService) {
  }


  changeCollapsed(isCollapsed: boolean): void {
    this.themesService.setIsCollapsed(isCollapsed);
  }

  getThemeOptions(): void {
    this.themesOptions$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.themesOptions = res;
      this.isMixiMode = res.mode === 'mixi';
      this.isFixedLeftNav = this.themesOptions.fixedLeftNav;

      if ((this.themesOptions.fixedHead && !this.isMixiMode) && this.themesOptions.hasTopArea) {
        this.contentMarginTop = this.themesOptions.fixedTab ? '96px' : '48px';
      } else {
        this.contentMarginTop = this.themesOptions.fixedTab ? '48px' : '0px';
      }

    });
  }

  ngOnInit(): void {
    this.getThemeOptions();
  }
}
