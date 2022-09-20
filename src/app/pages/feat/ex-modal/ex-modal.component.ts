/* eslint-disable prettier/prettier */
import { Component, OnInit, ChangeDetectionStrategy, TemplateRef, ViewChild } from '@angular/core';

import { PageHeaderType } from '@shared/components/page-header/page-header.component';
import { ModalBtnStatus } from '@widget/base-modal';
import { DragService } from '@widget/biz-widget/drag/drag.service';
import { NzModalWrapService } from '@widget/modal/nz-modal-wrap.service';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-ex-modal',
  templateUrl: './ex-modal.component.html',
  styleUrls: ['./ex-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExModalComponent implements OnInit {
  @ViewChild('dragTpl', { static: true }) dragTpl!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: 'Kéo Modal, cây cối chuyển sang chết, con người chuyển đến sống',
    breadcrumb: ['Home', 'Modal']
  };
  isVisible = false;
  isVisibleByDir = false;

  constructor(private dragService: DragService, private modalDragService: NzModalWrapService) {}

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
      nzTitle: 'Confirm',
      nzContent: 'Gợi ý gì',
      nzOnOk: () => {
        console.log('Chắc chắn rồi');
      },
      nzOnCancel: () => {
        console.log('Hủy bỏ');
      }
    });
  }

  showDailogInfo(): void {
    this.modalDragService.info({ nzTitle: 'Info', nzContent: 'Gợi ý gì' });
  }

  showDailogSuccess(): void {
    this.modalDragService.success({ nzTitle: 'Success', nzContent: 'Gợi ý gì' });
  }

  showDailogError(): void {
    this.modalDragService.error({ nzTitle: 'Error', nzContent: 'Gợi ý gì' });
  }

  showDailogWarning(): void {
    this.modalDragService.warning({ nzTitle: 'Warning', nzContent: 'Gợi ý gì' });
  }

  showDailog(): void {
    // 两种方式
    // this.dragService.show({nzTitle: this.dragTpl, nzMask: false,nzMaskStyle:{display:'none'},nzWrapClassName:"pointer-events-none"}).subscribe(res=>console.log(res))
    this.dragService
      .show({
        nzTitle: 'title',
        nzMask: false,
        nzMaskStyle: { display: 'none' },
        nzWrapClassName: 'pointer-events-none'
      })
      .subscribe(({ modalValue, status }) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        console.log(modalValue);
      });
  }

  ngOnInit(): void {}
}
