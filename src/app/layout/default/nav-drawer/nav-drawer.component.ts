import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ThemeService} from "@core/services/store/theme.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavDrawerComponent implements OnInit, OnDestroy {
  isShowModal = false;
  themesOptions$ = this.themesService.getThemesMode();
  private destory$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef, private themesService: ThemeService) {
  }

  subTheme(): void {
    this.themesService.getIsOverMode().pipe(takeUntil(this.destory$)).subscribe(res => {
      if (!res) {
        this.isShowModal = false;
      }
    });
  }

  showDraw() {
    this.isShowModal = true;
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  ngOnInit(): void {
    this.subTheme();
  }

}
