import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
    selector: 'app-fail',
    templateUrl: './fail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NzCardModule, NzResultModule, NzTypographyModule, NzIconModule, NzButtonModule, NzWaveModule]
})
export class FailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
