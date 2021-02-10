import {Component, EventEmitter, OnInit, ChangeDetectionStrategy, Output, Input, OnDestroy} from '@angular/core';
import {ThemeService} from '../../../core/services/store/theme.service';
import {Subject} from 'rxjs';
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
  themesOptions = {
    theme: '',
    color: '',
    mode: '',
    fixedWidth: false,
    colorWeak: false
  };
  isCollapsed$ = this.themesService.getIsCollapsed();
  isOverMode$ = this.themesService.getIsOverMode();

  constructor(private themesService: ThemeService) {
  }

  changeCollapsed(isCollapsed: boolean): void {
    this.themesService.setIsCollapsed(isCollapsed);
  }

  getThemeOptions(): void {
    this.themesOptions$.pipe(takeUntil(this.destory$)).subscribe(res => {
      this.themesOptions = res;
    });
  }

  ngOnInit(): void {
    this.getThemeOptions();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

}
