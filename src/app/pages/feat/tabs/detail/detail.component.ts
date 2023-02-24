import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NumberLoopPipe } from '../../../../shared/pipes/number-loop.pipe';
import { NgFor } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NzInputModule, NgFor, NumberLoopPipe]
})
export class DetailComponent implements OnInit {
  id = 0;

  constructor(private routeParam: ActivatedRoute, public cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.routeParam.queryParams.subscribe(params => {
      this.id = params['id'];
      this.cdr.markForCheck();
    });
  }
}
