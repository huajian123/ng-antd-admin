import {Component, EventEmitter, OnInit, ChangeDetectionStrategy, Output, Input} from '@angular/core';
import {ThemeService} from '../../../core/services/store/theme.service';


@Component({
  selector: 'app-def-layout-content',
  templateUrl: './def-layout-content.component.html',
  styleUrls: ['./def-layout-content.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefLayoutContentComponent implements OnInit {

  themesOptions$ = this.themesService.getThemesMode();
  isCollapsed = true;
  @Output() collapsedChange = new EventEmitter<boolean>();

  @Input()
  get collapsed(): boolean {
    return this.isCollapsed;
  }

  set collapsed(value: boolean) {
    this.isCollapsed = value;
    this.collapsedChange.emit(value);
  }


  constructor(private themesService: ThemeService) {
  }

  ngOnInit(): void {
  }

}
