import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NumberLoopPipe } from '@shared/pipes/number-loop.pipe';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzListModule, NzTagModule, NzGridModule, NzAvatarModule, NzTypographyModule, NzIconModule, NzButtonModule, NumberLoopPipe]
})
export class ArticleComponent {}
