import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NumberLoopPipe } from '@shared/pipes/number-loop.pipe';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzGridModule, NzCardModule, NzTypographyModule, NzAvatarModule, NzToolTipModule, NumberLoopPipe]
})
export class ProjectsComponent {}
