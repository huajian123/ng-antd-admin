import { DragDrop, DragRef } from '@angular/cdk/drag-drop';
import { ComponentRef, DestroyRef, Inject, inject, Injectable, Injector, Renderer2, RendererFactory2, TemplateRef, Type } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, of } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { GLOBAL_TPL_MODAL_ACTION_TOKEN } from '@app/tpl/global-modal-btn-tpl/global-modal-btn-tpl-token';
import { GlobalModalBtnTplComponentToken } from '@app/tpl/global-modal-btn-tpl/global-modal-btn-tpl.component';
import { ModalFullStatusStoreService } from '@store/common-store/modal-full-status-store.service';
import { fnGetUUID } from '@utils/tools';
import * as _ from 'lodash';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ModalButtonOptions, ModalOptions, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

interface ModalZIndex {
  zIndex: number;
  canChange: boolean;
}

export const enum ModalBtnStatus {
  Cancel,
  Ok
}

// 组件实例需要继承此类
export abstract class BasicConfirmModalComponent {
  protected constructor(protected modalRef: NzModalRef) {}

  protected abstract getCurrentValue(): NzSafeAny;
}

@Injectable({
  providedIn: 'root'
})
export class ModalWrapService {
  protected bsModalService: NzModalService;
  private btnTpl!: TemplateRef<any>;
  private renderer: Renderer2;
  destroyRef = inject(DestroyRef);

  private baseInjector = inject(Injector);
  private modalFullStatusStoreService = inject(ModalFullStatusStoreService);
  dragDrop = inject(DragDrop);
  rendererFactory = inject(RendererFactory2);
  private btnComponentRef: ComponentRef<GlobalModalBtnTplComponentToken> = inject(GLOBAL_TPL_MODAL_ACTION_TOKEN);

  constructor() {
    this.bsModalService = this.baseInjector.get(NzModalService);
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.btnTpl = this.btnComponentRef.instance.componentTpl;
    this.modalFullStatusStoreService
      .getModalFullStatusStore()
      .pipe(takeUntilDestroyed())
      .subscribe(fullStatus => {
        this.fullScreenIconClick(fullStatus);
      });
  }

  fullScreenIconClick(fullStatus: boolean): void {
    this.bsModalService.openModals.forEach(modal => {
      if (fullStatus) {
        this.renderer.addClass(modal.containerInstance['host'].nativeElement, 'fullscreen-modal');
      } else {
        this.renderer.removeClass(modal.containerInstance['host'].nativeElement, 'fullscreen-modal');
      }
    });
  }

  protected getRandomCls(): string {
    return `NZ-MODAL-WRAP-CLS-${fnGetUUID()}`;
  }

  private cancelCallback(modalButtonOptions: ModalButtonOptions): void {
    this.modalFullStatusStoreService.setModalFullStatusStore(false);
    return modalButtonOptions['modalRef'].destroy({ status: ModalBtnStatus.Cancel, value: null });
  }

  private confirmCallback(modalButtonOptions: ModalButtonOptions): void {
    (modalButtonOptions['modalRef'].componentInstance as NzSafeAny)
      .getCurrentValue()
      .pipe(
        tap(modalValue => {
          this.modalFullStatusStoreService.setModalFullStatusStore(false);
          if (!modalValue) {
            return of(false);
          } else {
            return modalButtonOptions['modalRef'].destroy({ status: ModalBtnStatus.Ok, modalValue });
          }
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  getZIndex(element: HTMLElement): number {
    return +getComputedStyle(element, null).zIndex;
  }

  /**
   * 获取所有对话框最大值,并确定是否需要修改
   *
   * @param wrapElement 待修改z-index 容器
   */
  getModalMaxZIndex(wrapElement: HTMLElement): ModalZIndex {
    return this.bsModalService.openModals.reduce<ModalZIndex>(
      (prev, modal) => {
        const element = modal.containerInstance['host'].nativeElement;
        if (wrapElement === element) {
          return prev;
        }
        const zIndex = this.getZIndex(element);
        if (zIndex >= prev.zIndex) {
          prev.zIndex = zIndex;
          prev.canChange = true;
        }
        return prev;
      },
      { zIndex: this.getZIndex(wrapElement), canChange: false! }
    );
  }

  // 当对话框面板时,设置当前对话框z-index为最大
  protected setMaxZIndex(wrapElement: HTMLElement): void {
    wrapElement.addEventListener(
      'mousedown',
      () => {
        const modalZIndex = this.getModalMaxZIndex(wrapElement);
        if (modalZIndex.canChange) {
          wrapElement.style.zIndex = `${modalZIndex.zIndex + 1}`;
        }
      },
      false
    );
  }

  protected createDrag<T = NzSafeAny>(wrapCls: string): DragRef<T> | null {
    const wrapElement = document.querySelector<HTMLDivElement>(`.${wrapCls}`)!;

    const rootElement = wrapElement.querySelector<HTMLDivElement>(`.ant-modal-content`)!;
    const handle = rootElement.querySelector<HTMLDivElement>('.ant-modal-header')!;
    const modalZIndex = this.getModalMaxZIndex(wrapElement);
    if (modalZIndex.canChange) {
      wrapElement.style.zIndex = `${modalZIndex.zIndex + 1}`;
    }
    // this.fixedWrapElementStyle(wrapElement);
    this.setMaxZIndex(wrapElement);
    if (handle) {
      handle.className += ' hand-model-move';
      return this.dragDrop.createDrag(handle).withHandles([handle]).withRootElement(rootElement);
    }
    return this.dragDrop.createDrag(rootElement).withHandles([rootElement]);
  }

  protected fixedWrapElementStyle(wrapElement: HTMLElement): void {
    wrapElement.style.pointerEvents = 'none';
  }

  // 创建对话框的配置项
  createModalConfig<T>(component: Type<NzSafeAny>, modalOptions: ModalOptions = {}, params: T, wrapCls: string): ModalOptions {
    const defaultOptions: ModalOptions = {
      nzTitle: '',
      nzContent: component,
      nzCloseIcon: modalOptions.nzCloseIcon || this.btnTpl,
      nzMaskClosable: false,
      nzFooter: [
        {
          label: '确认',
          type: 'primary',
          show: true,
          onClick: this.confirmCallback.bind(this)
        },
        {
          label: '取消',
          type: 'default',
          show: true,
          onClick: this.cancelCallback.bind(this)
        }
      ],
      nzOnCancel: () => {
        return new Promise(resolve => {
          resolve({ status: ModalBtnStatus.Cancel, value: null });
        });
      },
      nzClosable: true,
      nzWidth: 720,
      nzData: params // 参数中的属性将传入nzContent实例中
    };
    const newOptions = _.merge(defaultOptions, modalOptions);
    newOptions.nzWrapClassName = `${newOptions.nzWrapClassName || ''} ${wrapCls}`;
    return newOptions;
  }

  show<T>(component: Type<NzSafeAny>, modalOptions: ModalOptions = {}, params?: T): Observable<NzSafeAny> {
    const wrapCls = this.getRandomCls();
    const newOptions = this.createModalConfig(component, modalOptions, params, wrapCls);
    const modalRef = this.bsModalService.create(newOptions);
    let drag: DragRef | null;
    modalRef.afterOpen.pipe(first()).subscribe(() => {
      drag = this.createDrag(wrapCls);
    });

    return modalRef.afterClose.pipe(
      tap(() => {
        drag!.dispose();
        drag = null;
        this.modalFullStatusStoreService.setModalFullStatusStore(false);
      })
    );
  }
}
