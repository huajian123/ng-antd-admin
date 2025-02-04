import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';

import { ThemeService } from '@store/common-store/theme.service';

import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavBarComponent]
})
export class SideNavComponent {
  private themesService = inject(ThemeService);
  $themesOptions = computed(() => this.themesService.$themesOptions());
  $isNightTheme = computed(() => this.themesService.$isNightTheme());
  $isCollapsed = computed(() => this.themesService.$isCollapsed());
}
