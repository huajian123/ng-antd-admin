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
  // private startLeft = 0;
  // private startTop = 0;
  private modalElement: HTMLElement | null = null;

  /**
   * 创建调整大小处理程序
   *
   * @param wrapCls 类名
   * @param config 配置选项
   */
  createResizeHandlers(wrapCls: string, config: ModalResizeConfig = {}): void {
    const wrapElement = document.querySelector<HTMLDivElement>(`.${wrapCls}`)!;
    const modalContent = wrapElement.querySelector<HTMLDivElement>(`.ant-modal-content`)!;

    if (!modalContent) {
      return;
    }

    this.modalElement = modalContent;
    const defaultConfig: ModalResizeConfig = {
      minWidth: 400,
      minHeight: 300,
      maxWidth: window.innerWidth - 100,
      maxHeight: window.innerHeight - 100,
      ...config
    };

    // 创建8个调整大小的手柄（4个边 + 4个角）
    const handles = ['e', 's', 'se'];
    // const handles = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'];

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

    // 确保 modal-content 相对定位
    modalContent.style.position = 'relative';
  }

  /**
   * 开始调整大小
   */
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
    this.startWidth = rect.width;
    this.startHeight = rect.height;
    // this.startLeft = rect.left;
    // this.startTop = rect.top;

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

    let newWidth = this.startWidth;
    let newHeight = this.startHeight;
    // const newLeft = this.startLeft;
    // const newTop = this.startTop;

    // 根据手柄方向计算新的尺寸和位置
    if (this.currentHandle.includes('e')) {
      newWidth = this.startWidth + deltaX;
    }
    // if (this.currentHandle.includes('w')) {
    //   newWidth = this.startWidth - deltaX;
    //   newLeft = this.startLeft + deltaX;
    // }
    if (this.currentHandle.includes('s')) {
      newHeight = this.startHeight + deltaY;
    }
    // if (this.currentHandle.includes('n')) {
    //   newHeight = this.startHeight - deltaY;
    //   newTop = this.startTop + deltaY;
    // }

    // 应用最小和最大尺寸约束
    const minWidth = config.minWidth || 400;
    const minHeight = config.minHeight || 300;
    const maxWidth = config.maxWidth || window.innerWidth;
    const maxHeight = config.maxHeight || window.innerHeight;

    newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
    newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

    // 更新模态框尺寸
    this.modalElement.style.width = `${newWidth}px`;
    this.modalElement.style.height = `${newHeight}px`;

    // 如果从左边或上边调整大小，需要更新位置
    // if (this.currentHandle.includes('w') || this.currentHandle.includes('n')) {
    //   const modal = this.modalElement.parentElement;
    //   if (modal && modal.classList.contains('ant-modal')) {
    //     // 计算位置调整
    //     if (this.currentHandle.includes('w')) {
    //       const leftAdjust = this.startWidth - newWidth;
    //       modal.style.left = `${this.startLeft + leftAdjust}px`;
    //     }
    //     if (this.currentHandle.includes('n')) {
    //       const topAdjust = this.startHeight - newHeight;
    //       modal.style.top = `${this.startTop + topAdjust}px`;
    //     }
    //   }
    // }
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
      // n: 'ns-resize',
      s: 'ns-resize',
      e: 'ew-resize',
      // w: 'ew-resize',
      // ne: 'nesw-resize',
      // sw: 'nesw-resize',
      // nw: 'nwse-resize',
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
    this.stopResize();
  }
}
