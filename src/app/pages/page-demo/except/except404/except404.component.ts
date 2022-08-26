import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-except404',
  template: `
    <nz-result nzStatus="404" nzTitle="404" nzSubTitle="Sorry, the page you visited does not exist.">
      <div nz-result-extra>
        <button nz-button nzType="primary">Back Home</button>
      </div>
    </nz-result>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Except404Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
