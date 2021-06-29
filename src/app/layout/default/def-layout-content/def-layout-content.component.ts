import {Component, OnInit, ChangeDetectionStrategy, Output, Input, OnDestroy, ViewChild, ChangeDetectorRef} from '@angular/core';
import {SettingInterface, ThemeService} from '../../../core/services/store/theme.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-def-layout-content',
  templateUrl: './def-layout-content.component.html',
  styleUrls: ['./def-layout-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefLayoutContentComponent implements OnInit, OnDestroy {
  private destory$ = new Subject<void>();
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  themesOptions: SettingInterface = {
    theme: 'dark',
    color: '',
    mode: 'side',
    fixedWidth: false,
    colorWeak: false,
    fixedHead: false,
  };
  isCollapsed$: Observable<boolean> = this.themesService.getIsCollapsed();
  isOverMode$: Observable<boolean> = this.themesService.getIsOverMode();
  visibleSettingDrawer = false;

  constructor(private themesService: ThemeService, private cdr: ChangeDetectorRef) {
  }

  changeCollapsed(isCollapsed: boolean): void {
    this.themesService.setIsCollapsed(isCollapsed);
  }

  getThemeOptions(): void {
    this.themesOptions$.pipe(takeUntil(this.destory$)).subscribe(res => {
      this.themesOptions = res;
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
