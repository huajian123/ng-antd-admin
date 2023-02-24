import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NumberLoopPipe } from '../../../../../shared/pipes/number-loop.pipe';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NgFor } from '@angular/common';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NzListModule, NgFor, NzTagModule, NzGridModule, NzAvatarModule, NzTypographyModule, NzIconModule, NzButtonModule, NumberLoopPipe]
})
export class ArticleComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
