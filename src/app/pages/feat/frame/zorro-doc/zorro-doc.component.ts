import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef} from '@angular/core';
import {ScrollService} from "@core/services/common/scroll.service";

@Component({
  selector: 'app-zorro-doc',
  templateUrl: './zorro-doc.component.html',
  styleUrls: ['./zorro-doc.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZorroDocComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

}
