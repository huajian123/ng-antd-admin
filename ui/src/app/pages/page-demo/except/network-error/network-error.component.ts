import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-network-error',
  templateUrl: './network-error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzResultModule, NzButtonModule, NzWaveModule]
})
export class NetworkErrorComponent {
  img = 'imgs/except/net-error.svg';
}
