import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { inject, Injectable } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalTypes, NzModalService } from 'ng-zorro-antd/modal';

/**
 * 对话框拖动服务
 */
@Injectable({
  providedIn: 'root'
})
export class ModalDragService {
  static readonly DRAG_CLS_PREFIX = 'NZ-MODAL-WRAP-CLS-';

  modal = inject(NzModalService);
  dragDrop = inject(DragDrop);

  /**
   * 创建拖拽手柄
   *
   * @param wrapCls 类名
   * @param nzModalType 对话框类型
   */
  createDragHandler<T = NzSafeAny>(wrapCls: string, nzModalType?: ModalTypes): DragRef<T> {
    const wrapElement = document.querySelector<HTMLDivElement>(`.${wrapCls}`)!;
    const rootElement = wrapElement.querySelector<HTMLDivElement>(`.ant-modal-content`)!;
    const handle = nzModalType === 'confirm' ? rootElement.querySelector<HTMLDivElement>('.ant-modal-body')! : rootElement.querySelector<HTMLDivElement>('.ant-modal-header')!;
    this.fixedWrapElementStyle(wrapElement);
    this.setMaxZIndex(rootElement, wrapElement);
    return this.dragDrop.createDrag(handle).withHandles([handle]).withRootElement(rootElement);
  }

  /**
   * 获取随机类名
   */
  getRandomCls(): string {
    return ModalDragService.DRAG_CLS_PREFIX + Date.now() + Math.random().toString().replace('0.', '');
  }

  /**
   * 解决wrap的样式, 设置鼠标可以穿透
   *
   * @param wrapElement
   * @protected
   */
  protected fixedWrapElementStyle(wrapElement: HTMLElement): void {
    wrapElement.style.pointerEvents = 'none';
  }

  /**
   * 当前对话框点击时,设置当前对话框z-index为最大
   *
   * @param rootElement 当前对话框
   * @param wrapElement 待修改z-index 容器
   * @protected
   */
  protected setMaxZIndex(rootElement: HTMLElement, wrapElement: HTMLElement): void {
    rootElement.addEventListener(
      'mousedown',
      () => {
        const maxZIndex = this.getModalMaxZIndex(wrapElement);
        if (maxZIndex) {
          wrapElement.style.zIndex = `${maxZIndex + 1}`;
        }
      },
      false
    );
  }

  /**
   * 获取所有对话框最大值,并确定是否需要修改
   *
   * @param wrapElement 待修改z-index 容器
   */
  protected getModalMaxZIndex(wrapElement: HTMLElement): number | null {
    const wrapZIndex = this.getZIndex(wrapElement);
    const maxZIndex = this.modal.openModals.reduce<number>((prev, modal) => {
      // @ts-ignore
      const element = (modal.containerInstance.host || modal.containerInstance.elementRef).nativeElement;
      if (wrapElement === element) {
        return prev;
      }
      const zIndex = this.getZIndex(element);
      return zIndex > prev ? zIndex : prev;
    }, 0);
    return maxZIndex >= wrapZIndex ? maxZIndex : null;
  }

  protected getZIndex(element: HTMLElement): number {
    return +getComputedStyle(element, null).zIndex;
  }
}
