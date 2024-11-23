import { AsyncPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { SideNavWidth } from '@app/config/constant';
import { ThemeService } from '@store/common-store/theme.service';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { SideNavComponent } from '../side-nav/side-nav.component';

@Component({
  selector: 'app-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzDrawerModule, NzLayoutModule, SideNavComponent, AsyncPipe]
})
export class NavDrawerComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private themesService = inject(ThemeService);
  isShowModal = false;
  themesOptions$ = this.themesService.getThemesMode();
  destroyRef = inject(DestroyRef);
  SideNavWidth = SideNavWidth;

  subTheme(): void {
    this.themesService
      .getIsOverMode()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        if (!res) {
          this.isShowModal = false;
        }
      });
  }

  showDraw(): void {
    this.isShowModal = true;
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.subTheme();
  }
}
