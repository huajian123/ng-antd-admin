import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
    selector: 'app-no-data',
    templateUrl: './no-data.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NzResultModule, NzButtonModule, NzWaveModule]
})
export class NoDataComponent implements OnInit {
  img = '../../../../../assets/imgs/except/no-data.svg';

  constructor() {}

  ngOnInit(): void {}
}
