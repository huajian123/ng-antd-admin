import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NumberLoopPipe } from '../../../pipes/number-loop.pipe';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzListModule } from 'ng-zorro-antd/list';
import { NgTemplateOutlet, NgFor } from '@angular/common';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
    selector: 'app-home-notice',
    templateUrl: './home-notice.component.html',
    styleUrls: ['./home-notice.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NzCardModule, NzTabsModule, NgTemplateOutlet, NzListModule, NgFor, NzTypographyModule, NzTagModule, NumberLoopPipe]
})
export class HomeNoticeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
