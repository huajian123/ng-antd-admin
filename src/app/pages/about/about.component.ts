import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {DragService} from "@widget/biz-widget/drag/drag.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  // @ViewChild('dragTpl', {static: true}) dragTpl!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '可拖动对话框',
    breadcrumb: ['首页', '拖拽modal'],
  };

  constructor(private dragService: DragService) {
  }

  showDailog(): void {
    // 两种方式
    // this.dragService.show({nzTitle: this.dragTpl, nzMask: false,nzMaskStyle:{display:'none'},nzWrapClassName:"pointer-events-none"}).subscribe(res=>console.log(res))
    this.dragService.show({
      nzTitle: '拖动的title',
      nzMask: false,
      nzMaskStyle: {display: 'none'},
      nzWrapClassName: "pointer-events-none"
    }).subscribe(res => console.log(res))
  }

  ngOnInit(): void {
  }

}
