import { Component, ChangeDetectionStrategy } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-except403',
  template: `
    <nz-result nzStatus="403" nzSubTitle="Sorry, you are not authorized to access this page." nzTitle="403">
      <div nz-result-extra>
        <button nz-button nzType="primary">Back Home</button>
      </div>
    </nz-result>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzResultModule, NzButtonModule, NzWaveModule]
})
export class Except403Component {}
