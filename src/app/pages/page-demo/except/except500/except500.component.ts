import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
    selector: 'app-except500',
    template: `
    <nz-result nzStatus="500" nzTitle="500" nzSubTitle="Sorry, there is an error on server.">
      <div nz-result-extra>
        <button nz-button nzType="primary">Back Home</button>
      </div>
    </nz-result>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NzResultModule, NzButtonModule, NzWaveModule]
})
export class Except500Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
