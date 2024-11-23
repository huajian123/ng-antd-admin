import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { NumberLoopPipe } from '@shared/pipes/number-loop.pipe';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzInputModule, NumberLoopPipe]
})
export class DetailComponent implements OnInit {
  id = 0;
  destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private routeParam = inject(ActivatedRoute);

  ngOnInit(): void {
    this.routeParam.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
      this.id = params['id'];
      this.cdr.markForCheck();
    });
  }
}
