import { Component, inject, computed } from '@angular/core';

import { ThemeService } from '@store/common-store/theme.service';

import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.less',
  imports: [NavBarComponent]
})
export class SideNavComponent {
  private themesService = inject(ThemeService);
  $themesOptions = computed(() => this.themesService.$themesOptions());
  $isNightTheme = computed(() => this.themesService.$isNightTheme());
  $isCollapsed = computed(() => this.themesService.$isCollapsed());
}
