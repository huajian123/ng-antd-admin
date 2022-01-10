import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ThemeService} from '@core/services/store/theme.service';
import {Observable} from "rxjs";


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

  constructor(private themesService: ThemeService) {
  }

  ngOnInit(): void {
  }

}
