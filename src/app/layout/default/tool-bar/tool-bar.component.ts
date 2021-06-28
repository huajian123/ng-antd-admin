import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolBarComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

}
