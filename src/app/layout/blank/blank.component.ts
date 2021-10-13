import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlankComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
