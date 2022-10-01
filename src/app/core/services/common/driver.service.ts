
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import Driver from 'driver.js';
/*
 * https://madewith.cn/766
 * 引导页
 * */
@Injectable({
  providedIn: 'root'
})
export class DriverService {
  constructor(@Inject(DOCUMENT) private doc: Document) {}

  load(): void {
    setTimeout(() => {
      const driver = new Driver({
        animate: false,
        allowClose: true,
        doneBtnText: 'Kết thúc',
        closeBtnText: 'Khép kín',
        nextBtnText: 'Bước tiếp theo',
        prevBtnText: 'Trước',
        onHighlightStarted: () => {
          this.doc.body.style.cssText = 'overflow:hidden';
        },
        onReset: () => {
          this.doc.body.style.cssText = '';
        }
      });
      driver.defineSteps([
        {
          element: '#menuNav',
          popover: {
            title: 'Menu',
            description: 'Đây là menu',
            position: 'right-center'
          }
        },
        {
          element: '#drawer-handle',
          popover: {
            title: 'Nút cài đặt chủ đề',
            description: 'Nhấp để mở rộng chủ đề, bạn có thể kéo nó lên và xuống',
            position: 'left'
          }
        },
        {
          element: '#tools',
          popover: {
            title: 'Thanh công cụ',
            description: 'Màn hình khóa, Menu tìm kiếm, Toàn màn hình, Tin nhắn thông báo, Đăng xuất, Đa ngôn ngữ',
            position: 'bottom'
          }
        },
        {
          element: '#chats',
          popover: {
            title: 'Liên hệ với quản trị viên',
            description: 'Liên hệ với quản trị viên',
            position: 'top'
          }
        },
        {
          element: '#trigger',
          popover: {
            title: 'Thu gọn menu',
            description: 'thu gọn menu',
            position: 'bottom'
          }
        },
        {
          element: '#multi-tab',
          popover: {
            title: 'Nhiều nhãn',
            description: 'Nhấp chuột phải vào một tab để mở rộng nhiều tùy chọn và cuộn con lăn chuột để cuộn các tab sau khi vượt ra ngoài màn hình.',
            position: 'bottom'
          }
        },
        {
          element: '#multi-tab2',
          popover: {
            title: 'nhiều nhãn',
            description: 'Nhấp chuột phải vào một tab để mở rộng nhiều tùy chọn và cuộn con lăn chuột để cuộn các tab sau khi vượt ra ngoài màn hình.',
            position: 'bottom'
          }
        }
      ]);
      driver.start();
    }, 500);
  }
}
