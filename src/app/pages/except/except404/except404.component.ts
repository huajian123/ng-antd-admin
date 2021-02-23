import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-except404',
  templateUrl: './except404.component.html',
  styleUrls: ['./except404.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Except404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
