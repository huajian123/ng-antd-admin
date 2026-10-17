import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',

  imports: [NzResultModule, NzButtonModule, NzWaveModule]
})
export class NoDataComponent {
  img = 'imgs/except/no-data.svg';
}
