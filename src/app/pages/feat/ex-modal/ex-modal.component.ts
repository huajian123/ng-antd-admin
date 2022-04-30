import {Component, OnInit, ChangeDetectionStrategy, TemplateRef, ViewChild} from '@angular/core';
import {PageHeaderType} from "@shared/components/page-header/page-header.component";
import {DragService} from "@widget/biz-widget/drag/drag.service";
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {ModalBtnStatus} from "@widget/base-modal";
import {NzModalWrapService} from "@widget/modal/nz-modal-wrap.service";

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
  isVisibleByDir = false;

  constructor(private dragService: DragService, private modalDragService: NzModalWrapService) {
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.isVisibleByDir = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
    this.isVisibleByDir = false;
  }

  showDailog1(): void {
    this.isVisible = true;
  }

  showDailogConfirm(): void {
    this.modalDragService.confirm({
      nzTitle: 'Confirm', nzContent: '提示一下的内容', nzOnOk: () => {
        console.log('确定');
      },
      nzOnCancel:()=>{
        console.log('取消');
      }
    })
  }

  showDailogInfo(): void {
    this.modalDragService.info({nzTitle: 'Info', nzContent: '提示一下的内容'})
  }

  showDailogSuccess(): void {
    this.modalDragService.success({nzTitle: 'Success', nzContent: '提示一下的内容'})
  }

  showDailogError(): void {
    this.modalDragService.error({nzTitle: 'Error', nzContent: '提示一下的内容'})
  }

  showDailogWarning(): void {
    this.modalDragService.warning({nzTitle: 'Warning', nzContent: '提示一下的内容'})
  }

  showDailog(): void {
    // 两种方式
    // this.dragService.show({nzTitle: this.dragTpl, nzMask: false,nzMaskStyle:{display:'none'},nzWrapClassName:"pointer-events-none"}).subscribe(res=>console.log(res))
    this.dragService.show({
      nzTitle: '拖动的title',
      nzMask: false,
      nzMaskStyle: {display: 'none'},
      nzWrapClassName: "pointer-events-none"
    }).subscribe(({modalValue, status}) => {
      if (status === ModalBtnStatus.Cancel) {
        return;
      }
      console.log(modalValue);
    })
  }

  ngOnInit(): void {
  }

}
