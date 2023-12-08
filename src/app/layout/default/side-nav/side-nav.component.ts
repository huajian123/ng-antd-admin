import { AsyncPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { ThemeService } from '@store/common-store/theme.service';

import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NavBarComponent, AsyncPipe]
})
export class SideNavComponent {
  private themesService = inject(ThemeService);
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  isCollapsed$: Observable<boolean> = this.themesService.getIsCollapsed();
}
