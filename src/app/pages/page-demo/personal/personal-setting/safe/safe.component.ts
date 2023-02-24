import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
    selector: 'app-safe',
    templateUrl: './safe.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NzListModule]
})
export class SafeComponent implements OnInit {
  @Input() data!: { label: string };
  constructor() {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
