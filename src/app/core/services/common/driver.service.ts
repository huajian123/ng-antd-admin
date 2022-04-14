import {Inject, Injectable} from '@angular/core';
import Driver from 'driver.js';
import {DOCUMENT} from "@angular/common";
/*
* https://madewith.cn/766
* 引导页
* */
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(@Inject(DOCUMENT) private doc: Document) {
  }


  load(): void {
    setTimeout(() => {
      const driver = new Driver({
        animate: false,
        allowClose: true,
        doneBtnText: '完成',
        closeBtnText: '关闭',
        nextBtnText: '下一步',
        prevBtnText: '上一步',
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
            title: '菜单',
            description: '这里是菜单',
            position: 'right-center'
          }
        },
        {
          element: '#drawer-handle',
          popover: {
            title: '主题设置按钮',
            description: '点击展开设置主题，可以上下拖动',
            position: 'left'
          }
        },
        {
          element: '#tools',
          popover: {
            title: '工具栏',
            description: '锁屏，搜索菜单，全屏，通知消息，退出登录，多语言',
            position: 'bottom'
          }
        },
        {
          element: '#chats',
          popover: {
            title: '联系管理员',
            description: '跟管理员联系联系',
            position: 'top'
          }
        },
        {
          element: '#trigger',
          popover: {
            title: '折叠菜单',
            description: '菜单折叠',
            position: 'bottom'
          }
        },
        {
          element: '#multi-tab',
          popover: {
            title: '多标签',
            description: '鼠标右键点击单个标签可以展开多个选项，超出屏幕后，滚动鼠标滚轮可以进行页签滚动',
            position: 'bottom'
          }
        },
        {
          element: '#multi-tab2',
          popover: {
            title: '多标签',
            description: '鼠标右键点击单个标签可以展开多个选项，超出屏幕后，滚动鼠标滚轮可以进行页签滚动',
            position: 'bottom'
          }
        },
      ]);
      driver.start();
    }, 500)

  }
}
