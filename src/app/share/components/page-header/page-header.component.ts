import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ThemeService} from '../../../core/services/theme.service';

export interface PageHeaderType {
  title: string;
  desc: string;
  breadcrumb: string[];
}


@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent implements OnInit {

  @Input() pageHeaderInfo: Partial<PageHeaderType> = {};
  themesOptions$ = this.themesService.getThemesMode();

  constructor(private themesService: ThemeService) {
  }

  ngOnInit(): void {
  }

}
