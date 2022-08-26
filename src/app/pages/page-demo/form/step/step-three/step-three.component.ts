import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepThreeComponent implements OnInit {
  @Input('stepDirection') stepDirection: 'horizontal' | 'vertical' = 'horizontal';
  @Output() readonly next = new EventEmitter<NzSafeAny>();

  constructor() {}

  ngOnInit(): void {}
}
