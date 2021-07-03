import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SuccessComponent implements OnInit {
  stepDirection: 'horizontal' | 'vertical' = 'horizontal';

  constructor(private breakpointObserver: BreakpointObserver,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.breakpointObserver.observe(['(max-width: 770px)']).subscribe(result => {
      console.log(result.matches);
      let tempDir: 'vertical' | 'horizontal' = 'vertical';
      if (result.matches) {
        tempDir = 'vertical';
      } else {
        tempDir = 'horizontal';
      }
      if (tempDir !== this.stepDirection) {
        this.stepDirection = tempDir;
        this.cdr.markForCheck();
      }
    });
  }

}
