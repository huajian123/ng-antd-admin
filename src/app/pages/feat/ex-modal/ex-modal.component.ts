import {Component, OnInit, ChangeDetectionStrategy, TemplateRef, ViewChild} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {DragService} from "@widget/biz-widget/drag/drag.service";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {ModalBtnStatus} from "@widget/base-modal";

@Component({
  selector: 'app-ex-modal',
  templateUrl: './ex-modal.component.html',
  styleUrls: ['./ex-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExModalComponent implements OnInit {

  @ViewChild('dragTpl', {static: true}) dragTpl!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '拖动Modal，树挪死，人挪活',
    breadcrumb: ['首页', '拖拽modal'],
  };
  isVisible = false;

  constructor(private dragService: DragService) {
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  showDailog1(): void {
    this.isVisible = true;
  }

  showDailog(): void {
    // 两种方式
    // this.dragService.show({nzTitle: this.dragTpl, nzMask: false,nzMaskStyle:{display:'none'},nzWrapClassName:"pointer-events-none"}).subscribe(res=>console.log(res))
    this.dragService.show({
      nzTitle: '拖动的title',
      nzMask: false,
      nzMaskStyle: {display: 'none'},
      nzWrapClassName: "pointer-events-none"
    }).subscribe(({modalValue, status})=>{
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      console.log(modalValue);
    })
  }

  ngOnInit(): void {
  }

}
