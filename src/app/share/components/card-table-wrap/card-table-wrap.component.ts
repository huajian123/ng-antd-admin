import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';


@Component({
  selector: 'app-card-table-wrap',
  templateUrl: './card-table-wrap.component.html',
  styleUrls: ['./card-table-wrap.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTableWrapComponent implements OnInit {
  @Input() btnTpl: TemplateRef<any> | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
