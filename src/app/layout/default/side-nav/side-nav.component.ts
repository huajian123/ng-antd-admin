import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ThemeService} from '../../../core/services/store/theme.service';
import {TabService} from '../../../core/services/common/tab.service';
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

  constructor(private themesService: ThemeService) {}

  ngOnInit(): void {
  }

}
