import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-safe',
  templateUrl: './safe.component.html',
  styleUrls: ['./safe.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SafeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
