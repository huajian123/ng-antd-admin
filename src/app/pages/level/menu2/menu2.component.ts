import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NumberLoopPipe } from '@shared/pipes/number-loop.pipe';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-menu2',
  templateUrl: './menu2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzInputModule, NumberLoopPipe]
})
export class Menu2Component {}
