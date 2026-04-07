import { Injectable } from '@angular/core';

export interface ModalResizeConfig {
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

/**
 * 对话框调整大小服务
 */
@Injectable({
  providedIn: 'root'
})
export class ModalResizeService {
  private resizeHandles: HTMLElement[] = [];
  private isResizing = false;
  private currentHandle: string | null = null;
  private startX = 0;
  private startY = 0;
  private startWidth = 0;
  private startHeight = 0;
  private startMarginLeft = 0;
  private startMarginTop = 0;
  private modalElement: HTMLElement | null = null;
  // .ant-modal 外层容器，用于 n/w 方向的位置偏移，不干扰 CDK drag 的 transform
  private modalOuterElement: HTMLElement | null = null;

  createResizeHandlers(wrapCls: string, config: ModalResizeConfig = {}): void {
    const wrapElement = document.querySelector<HTMLDivElement>(`.${wrapCls}`)!;
    const modalContent = wrapElement.querySelector<HTMLDivElement>(`.ant-modal-content`)!;

    if (!modalContent) {
      return;
    }

    this.modalElement = modalContent;
    this.modalOuterElement = wrapElement.querySelector<HTMLDivElement>('.ant-modal');
    const initialHeight = modalContent.getBoundingClientRect().height;
    const defaultConfig: ModalResizeConfig = {
      minWidth: 400,
      maxWidth: window.innerWidth - 100,
      maxHeight: window.innerHeight - 100,
      ...config,
      // 以 modal 打开时的实际高度作为最小高度
      minHeight: initialHeight,
    };

    const handles = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'];

    handles.forEach(direction => {
      const handle = document.createElement('div');
      handle.className = `modal-resize-handle modal-resize-handle-${direction}`;
      handle.dataset['direction'] = direction;
      modalContent.appendChild(handle);
      this.resizeHandles.push(handle);

      handle.addEventListener('mousedown', (e: MouseEvent) => {
        this.startResize(e, direction, defaultConfig);
      });
    });

    modalContent.style.position = 'relative';
  }

  private startResize(e: MouseEvent, direction: string, config: ModalResizeConfig): void {
    e.preventDefault();
    e.stopPropagation();

    if (!this.modalElement) {
      return;
    }

    this.isResizing = true;
    this.currentHandle = direction;
    this.startX = e.clientX;
    this.startY = e.clientY;

    const rect = this.modalElement.getBoundingClientRect();
    const minWidth = config.minWidth || 400;
    const minHeight = config.minHeight || 300;

    // 记录实际尺寸与最小值的最大值作为起始值，不提前写入 style，避免固化 auto 高度
    this.startWidth = Math.max(rect.width, minWidth);
    this.startHeight = Math.max(rect.height, minHeight);

    // 记录 .ant-modal 当前的 margin 偏移作为起始位置（n/w 方向通过 margin 移动，不碰 CDK drag 的 transform）
    const outer = this.modalOuterElement;
    if (outer) {
      // getComputedStyle 能正确解析 auto，得到实际像素值
      const computed = getComputedStyle(outer);
      this.startMarginLeft = parseFloat(computed.marginLeft) || 0;
      this.startMarginTop = parseFloat(computed.marginTop) || 0;
      // 将 auto margin 固化为像素值，防止后续设置时被 auto 覆盖
      outer.style.marginLeft = `${this.startMarginLeft}px`;
      outer.style.marginTop = `${this.startMarginTop}px`;
    } else {
      this.startMarginLeft = 0;
      this.startMarginTop = 0;
    }

    const onMouseMove = (moveEvent: MouseEvent): void => {
      this.resize(moveEvent, config);
    };

    const onMouseUp = (): void => {
      this.stopResize();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // 添加 body 样式以防止文本选择
    document.body.style.userSelect = 'none';
    document.body.style.cursor = this.getCursor(direction);
  }

  /**
   * 调整大小
   */
  private resize(e: MouseEvent, config: ModalResizeConfig): void {
    if (!this.isResizing || !this.modalElement || !this.currentHandle) {
      return;
    }

    const deltaX = e.clientX - this.startX;
    const deltaY = e.clientY - this.startY;

    const minWidth = config.minWidth || 400;
    const minHeight = config.minHeight || 300;
    const maxWidth = config.maxWidth || window.innerWidth;
    const maxHeight = config.maxHeight || window.innerHeight;

    let newWidth = this.startWidth;
    let newHeight = this.startHeight;
    let newMarginLeft = this.startMarginLeft;
    let newMarginTop = this.startMarginTop;

    if (this.currentHandle.includes('e')) {
      newWidth = this.startWidth + deltaX;
    }
    if (this.currentHandle.includes('w')) {
      newWidth = this.startWidth - deltaX;
      newMarginLeft = this.startMarginLeft + deltaX;
    }
    if (this.currentHandle.includes('s')) {
      newHeight = this.startHeight + deltaY;
    }
    if (this.currentHandle.includes('n')) {
      newHeight = this.startHeight - deltaY;
      newMarginTop = this.startMarginTop + deltaY;
    }

    // 应用尺寸约束，并反向修正 margin，防止小于最小值时位置漂移
    if (newWidth < minWidth) {
      if (this.currentHandle.includes('w')) {
        newMarginLeft = this.startMarginLeft + (this.startWidth - minWidth);
      }
      newWidth = minWidth;
    }
    if (newWidth > maxWidth) {
      newWidth = maxWidth;
    }
    if (newHeight < minHeight) {
      if (this.currentHandle.includes('n')) {
        newMarginTop = this.startMarginTop + (this.startHeight - minHeight);
      }
      newHeight = minHeight;
    }
    if (newHeight > maxHeight) {
      newHeight = maxHeight;
    }

    this.modalElement.style.width = `${newWidth}px`;
    this.modalElement.style.height = `${newHeight}px`;

    // n/w 方向通过操作 .ant-modal 的 margin 移动位置，完全不碰 CDK drag 管理的 transform
    if (this.modalOuterElement) {
      if (this.currentHandle.includes('w')) {
        this.modalOuterElement.style.marginLeft = `${newMarginLeft}px`;
      }
      if (this.currentHandle.includes('n')) {
        this.modalOuterElement.style.marginTop = `${newMarginTop}px`;
      }
    }
  }

  /**
   * 停止调整大小
   */
  private stopResize(): void {
    this.isResizing = false;
    this.currentHandle = null;
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  }

  /**
   * 获取光标样式
   */
  private getCursor(direction: string): string {
    const cursorMap: Record<string, string> = {
      n: 'ns-resize',
      s: 'ns-resize',
      e: 'ew-resize',
      w: 'ew-resize',
      ne: 'nesw-resize',
      sw: 'nesw-resize',
      nw: 'nwse-resize',
      se: 'nwse-resize'
    };
    return cursorMap[direction] || 'default';
  }

  /**
   * 清理调整大小手柄
   */
  dispose(): void {
    this.resizeHandles.forEach(handle => {
      handle.remove();
    });
    this.resizeHandles = [];
    this.modalElement = null;
    this.modalOuterElement = null;
    this.stopResize();
  }
}
