import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-except403',
  template: `
    <nz-result nzStatus="403" nzTitle="403" nzSubTitle="Sorry, you are not authorized to access this page.">
      <div nz-result-extra>
        <button nz-button nzType="primary">Back Home</button>
      </div>
    </nz-result>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Except403Component implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {}
}
