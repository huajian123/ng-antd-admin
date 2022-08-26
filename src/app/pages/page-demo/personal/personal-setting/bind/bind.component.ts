import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BindComponent implements OnInit {
  @Input() data!: { label: string };
  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
