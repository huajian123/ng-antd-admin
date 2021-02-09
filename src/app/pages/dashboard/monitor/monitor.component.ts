import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorComponent implements OnInit {
  deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
  }
}
