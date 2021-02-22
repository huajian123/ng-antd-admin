import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BindComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
