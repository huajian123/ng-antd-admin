import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network-error',
  templateUrl: './network-error.component.html',
  styleUrls: ['./network-error.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NetworkErrorComponent implements OnInit {
  img = '../../../../../assets/imgs/except/net-error.svg';
  constructor() {}

  ngOnInit(): void {}
}
