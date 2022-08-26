import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-except500',
  template: `
    <nz-result nzStatus="500" nzTitle="500" nzSubTitle="Sorry, there is an error on server.">
      <div nz-result-extra>
        <button nz-button nzType="primary">Back Home</button>
      </div>
    </nz-result>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Except500Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
