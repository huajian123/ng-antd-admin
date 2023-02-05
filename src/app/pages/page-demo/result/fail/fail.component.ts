import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-fail',
  templateUrl: './fail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
