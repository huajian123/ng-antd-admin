import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-data',
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoDataComponent implements OnInit {
  img = '../../../../../assets/imgs/except/no-data.svg';

  constructor() {}

  ngOnInit(): void {}
}
