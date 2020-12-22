import {ChangeDetectionStrategy, Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemeService} from '../../core/services/theme.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultComponent implements OnInit {

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
