import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Component, ChangeDetectionStrategy, TemplateRef, ViewChild, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import { ModalBtnStatus } from '@widget/base-modal';
import { DragService } from '@widget/biz-widget/drag/drag.service';
import { ModalDragDirective } from '@widget/modal/modal-drag.directive';
import { NzModalWrapService } from '@widget/modal/nz-modal-wrap.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-ex-modal',
  templateUrl: './ex-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzButtonModule, NzWaveModule, NzModalModule, ModalDragDirective, CdkDrag, CdkDragHandle]
})
export class ExModalComponent {
  @ViewChild('dragTpl', { static: true }) dragTpl!: TemplateRef<NzSafeAny>;
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '拖动Modal，树挪死，人挪活',
    breadcrumb: ['首页', '拖拽modal']
  };
  destroyRef = inject(DestroyRef);
  isVisible = false;
  isVisibleByDir = false;

  private dragService = inject(DragService);
  private modalDragService = inject(NzModalWrapService);

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
      nzContent: '提示一下的内容',
      nzOnOk: () => {
        console.log('确定');
      },
      nzOnCancel: () => {
        console.log('取消');
      }
    });
  }

  showDailogInfo(): void {
    this.modalDragService.info({ nzTitle: 'Info', nzContent: '提示一下的内容' });
  }

  showDailogSuccess(): void {
    this.modalDragService.success({ nzTitle: 'Success', nzContent: '提示一下的内容' });
  }

  showDailogError(): void {
    this.modalDragService.error({ nzTitle: 'Error', nzContent: '提示一下的内容' });
  }

  showDailogWarning(): void {
    this.modalDragService.warning({ nzTitle: 'Warning', nzContent: '提示一下的内容' });
  }

  showDailog(): void {
    // 两种方式
    // this.dragService.show({nzTitle: this.dragTpl, nzMask: false,nzMaskStyle:{display:'none'},nzWrapClassName:"pointer-events-none"}).subscribe(res=>console.log(res))
    this.dragService
      .show(
        {
          nzTitle: '拖动的title',
          nzMask: false,
          nzMaskStyle: { display: 'none' },
          nzWrapClassName: 'pointer-events-none'
        },
        { title: '我是从外部传入到对话框的参数' }
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ modalValue, status }) => {
        if (status === ModalBtnStatus.Cancel) {
          return;
        }
        console.log(modalValue);
      });
  }
}
