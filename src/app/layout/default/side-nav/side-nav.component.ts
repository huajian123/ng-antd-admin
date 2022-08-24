import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { ThemeService } from '@store/common-store/theme.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent implements OnInit {
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  isCollapsed$: Observable<boolean> = this.themesService.getIsCollapsed();

  constructor(private themesService: ThemeService) {}

  ngOnInit(): void {}
}
