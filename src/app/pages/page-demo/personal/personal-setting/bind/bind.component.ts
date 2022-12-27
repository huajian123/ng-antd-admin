import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { NzIconService } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BindComponent implements OnInit {
  @Input() data!: { label: string };
  constructor(private iconService: NzIconService) {
    this.iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
