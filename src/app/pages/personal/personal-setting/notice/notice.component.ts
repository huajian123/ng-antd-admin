import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoticeComponent implements OnInit {
  @Input() label!: string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.label);
  }

}
