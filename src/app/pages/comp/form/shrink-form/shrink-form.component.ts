import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shrink-form',
  templateUrl: './shrink-form.component.html',
  styleUrls: ['./shrink-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShrinkFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
