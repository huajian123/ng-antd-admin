import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
