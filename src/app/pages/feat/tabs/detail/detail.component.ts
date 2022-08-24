import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
