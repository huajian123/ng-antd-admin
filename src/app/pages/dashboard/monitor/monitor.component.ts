import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, Injector, NgZone, OnInit } from '@angular/core';
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonitorComponent implements OnInit{
  DisplayUrl: any;
  constructor() {}
  ngOnInit(): void {
    
  }

}
