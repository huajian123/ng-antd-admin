import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ThemeService} from "@store/common-store/theme.service";
import {takeUntil} from "rxjs/operators";
import {DestroyService} from "@core/services/common/destory.service";

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class NavDrawerComponent implements OnInit {
  isShowModal = false;
  themesOptions$ = this.themesService.getThemesMode();

  constructor(private destroy$: DestroyService, private cdr: ChangeDetectorRef, private themesService: ThemeService) {
  }

  subTheme(): void {
    this.themesService.getIsOverMode().pipe(takeUntil(this.destroy$)).subscribe(res => {
      if (!res) {
        this.isShowModal = false;
      }
    });
  }

  showDraw() {
    this.isShowModal = true;
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.subTheme();
  }

}
