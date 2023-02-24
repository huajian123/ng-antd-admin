import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
    selector: 'app-bind',
    templateUrl: './bind.component.html',
    styleUrls: ['./bind.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NzListModule, NzIconModule, NzButtonModule]
})
export class BindComponent implements OnInit {
  @Input() data!: { label: string };
  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
