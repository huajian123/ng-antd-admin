import { computed, DestroyRef, inject, Injectable, DOCUMENT } from '@angular/core';

import { ThemeService } from '@store/common-store/theme.service';
import { driver, DriveStep } from 'driver.js';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
/*
 * https://madewith.cn/766
 * 引导页
 * */
@Injectable({
  providedIn: 'root'
})
export class DriverService {
  themesService = inject(ThemeService);
  destroyRef = inject(DestroyRef);
  private readonly doc = inject(DOCUMENT);
  $fixedTab = computed(() => this.themesService.$themesOptions().fixedTab);

  load(): void {
    // 是否是固定页签
    const tabId = !this.$fixedTab() ? '#multi-tab' : '#multi-tab2';
    const steps: DriveStep[] = [
      {
        element: '#menuNav',
        popover: {
          title: '菜单',
          description: '这里是菜单',
          side: 'right',
          align: 'center'
        }
      },
      {
        element: '#drawer-handle',
        popover: {
          title: '主题设置按钮',
          description: '点击展开设置主题，可以上下拖动',
          side: 'left'
        }
      },
      {
        element: '#tools',
        popover: {
          title: '工具栏',
          description: '锁屏，搜索菜单，全屏，通知消息，退出登录，多语言',
          side: 'bottom'
        }
      },
      {
        element: '#chats',
        popover: {
          title: '联系管理员',
          description: '跟管理员联系联系',
          side: 'top'
        }
      },
      {
        element: '#trigger',
        popover: {
          title: '折叠菜单',
          description: '菜单折叠',
          side: 'bottom'
        }
      },
      {
        element: tabId,
        popover: {
          title: '多标签',
          description: '鼠标右键点击单个标签可以展开多个选项，超出屏幕后，滚动鼠标滚轮可以进行页签滚动',
          side: 'bottom'
        }
      }
    ];

    // https://github.com/kamranahmedse/driver.js/issues/489
    const filteredSteps: NzSafeAny = steps.filter(step => {
      const element = document.querySelector(step.element as string);
      return !step.element || element !== null;
    });

    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      doneBtnText: '完成',
      nextBtnText: '下一步',
      prevBtnText: '上一步',
      onHighlightStarted: () => {
        this.doc.body.style.cssText = 'overflow:hidden';
      },
      onDestroyed: () => {
        this.doc.body.style.cssText = '';
      },
      steps: filteredSteps
    });

    driverObj.drive();
  }
}
