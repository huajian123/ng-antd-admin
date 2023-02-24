import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NumberLoopPipe } from '../../../shared/pipes/number-loop.pipe';
import { NgFor } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
    selector: 'app-menu2',
    templateUrl: './menu2.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NzInputModule, NgFor, NumberLoopPipe]
})
export class Menu2Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
