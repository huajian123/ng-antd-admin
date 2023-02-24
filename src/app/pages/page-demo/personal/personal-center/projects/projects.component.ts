import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NumberLoopPipe } from '../../../../../shared/pipes/number-loop.pipe';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NgFor } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NzGridModule, NgFor, NzCardModule, NzTypographyModule, NzAvatarModule, NzToolTipModule, NumberLoopPipe]
})
export class ProjectsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
