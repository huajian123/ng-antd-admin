/*
 * 只有在菜单静态加载时候，可以把以下注释打开
 * */

/*import { InjectionToken } from '@angular/core';

import { ActionCode } from '@config/actionCode';
import { Menu } from '@core/services/types';

/!*定义菜单*!/
export const MENU_TOKEN = new InjectionToken<Menu[]>('menu-token', {
  providedIn: 'root',
  factory(): Menu[] {
    return menuNav;
  }
});

const menuNav: Menu[] = [
  {
    menuName: 'Dashboard',
    id: 1,
    fatherId: 0,
    icon: 'dashboard',
    open: false,
    selected: false,
    menuType: 'C',
    path: '/default/dashboard',
    code: ActionCode.TabsDetail,
    children: [
      {
        id: 1,
        fatherId: 0,
        menuName: '分析页',
        open: false,
        icon: 'fund',
        selected: false,
        menuType: 'C',
        code: ActionCode.TabsDetail,
        path: '/default/dashboard/analysis'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '监控页',
        open: false,
        icon: 'fund',
        selected: false,
        menuType: 'C',
        code: ActionCode.TabsDetail,
        path: '/default/dashboard/monitor'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '工作台',
        open: false,
        icon: 'appstore',
        selected: false,
        menuType: 'C',
        code: ActionCode.TabsDetail,
        path: '/default/dashboard/workbench'
      }
    ]
  },
  {
    menuName: '页面',
    icon: 'appstore',
    open: false,
    id: 1,
    fatherId: 0,
    code: ActionCode.TabsDetail,
    selected: false,
    menuType: 'C',
    path: '/default/page-demo',
    children: [
      {
        id: 1,
        fatherId: 0,
        menuName: '表单页',
        icon: 'form',
        open: false,
        selected: false,
        menuType: 'C',
        code: ActionCode.TabsDetail,
        path: '/default/page-demo/form',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: '基础表单',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'form',
            code: ActionCode.TabsDetail,
            path: '/default/page-demo/form/base-form'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '分步表单',
            open: false,
            selected: false,
            menuType: 'C',
            code: ActionCode.TabsDetail,
            icon: 'form',
            path: '/default/page-demo/form/step-form'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '高级表单',
            open: false,
            selected: false,
            menuType: 'C',
            code: ActionCode.TabsDetail,
            icon: 'form',
            path: '/default/page-demo/form/advanced-form'
          }
        ]
      },
      {
        menuName: '列表页',
        icon: 'table',
        open: false,
        selected: false,
        menuType: 'C',
        code: ActionCode.TabsDetail,
        id: 1,
        fatherId: 0,
        path: '/default/page-demo/list',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: '搜索列表',
            open: false,
            selected: false,
            menuType: 'C',
            code: ActionCode.TabsDetail,
            icon: 'table',
            path: '/default/page-demo/list/search-list',
            children: [
              {
                id: 1,
                fatherId: 0,
                menuName: '搜索列表(文章）',
                open: false,
                selected: false,
                menuType: 'C',
                icon: 'table',
                code: ActionCode.TabsDetail,
                path: '/default/page-demo/list/search-list/article'
              },
              {
                id: 1,
                fatherId: 0,
                menuName: '搜索列表(项目)',
                open: false,
                selected: false,
                menuType: 'C',
                icon: 'table',
                code: ActionCode.TabsDetail,
                path: '/default/page-demo/list/search-list/project'
              },
              {
                id: 1,
                fatherId: 0,
                menuName: '搜索列表(应用)',
                open: false,
                selected: false,
                menuType: 'C',
                icon: 'table',
                code: ActionCode.TabsDetail,
                path: '/default/page-demo/list/search-list/application'
              }
            ]
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '查询表格',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'table',
            code: ActionCode.TabsDetail,
            path: '/default/page-demo/list/search-table'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '树状表格',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'table',
            code: ActionCode.TabsDetail,
            path: '/default/page-demo/list/tree-list'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '标准表格',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'table',
            code: ActionCode.TabsDetail,
            path: '/default/page-demo/list/standard-table'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '卡片列表',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'table',
            code: ActionCode.TabsDetail,
            path: '/default/page-demo/list/card-table'
          }
        ]
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '详情页',
        icon: 'profile',
        open: false,
        selected: false,
        menuType: 'C',
        code: ActionCode.TabsDetail,
        path: '/default/page-demo/detail',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: '基础详情页',
            open: false,
            selected: false,
            menuType: 'C',
            code: ActionCode.TabsDetail,
            icon: 'profile',
            path: '/default/page-demo/detail/base-detail'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '高级详情页',
            open: false,
            selected: false,
            menuType: 'C',
            code: ActionCode.TabsDetail,
            icon: 'profile',
            path: '/default/page-demo/detail/adv-detail'
          }
        ]
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '结果页',
        icon: 'check-circle',
        open: false,
        selected: false,
        menuType: 'C',
        code: ActionCode.TabsDetail,
        path: '/default/page-demo/result',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: '成功页',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'check-circle',
            code: ActionCode.TabsDetail,
            path: '/default/page-demo/result/success'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '失败页',
            open: false,
            selected: false,
            menuType: 'C',
            code: ActionCode.TabsDetail,
            icon: 'check-circle',
            path: '/default/page-demo/result/fail'
          }
        ]
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '异常页',
        icon: 'warning',
        open: false,
        selected: false,
        menuType: 'C',
        code: ActionCode.TabsDetail,
        path: '/default/page-demo/except',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: '403',
            open: false,
            code: ActionCode.TabsDetail,
            selected: false,
            menuType: 'C',
            icon: 'warning',
            path: '/default/page-demo/except/except403'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '404',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'warning',
            code: ActionCode.TabsDetail,
            path: '/default/page-demo/except/except404'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '500',
            open: false,
            selected: false,
            menuType: 'C',
            code: ActionCode.TabsDetail,
            icon: 'warning',
            path: '/default/page-demo/except/except500'
          }
        ]
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '个人页',
        icon: 'user',
        open: false,
        selected: false,
        menuType: 'C',
        code: ActionCode.TabsDetail,
        path: '/default/page-demo/personal',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: '个人中心',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'user',
            code: ActionCode.TabsDetail,
            path: '/default/page-demo/personal/personal-center'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '个人设置',
            open: false,
            code: ActionCode.TabsDetail,
            selected: false,
            menuType: 'C',
            icon: 'user',
            path: '/default/page-demo/personal/personal-setting'
          }
        ]
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '图形编辑器',
        icon: '',
        alIcon: 'icon-mel-help',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/page-demo/flow',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: '流程图',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'highlight',
            path: '/default/page-demo/flow/flow-chat',
            code: ActionCode.TabsDetail
          }
        ]
      }
    ]
  },
  {
    id: 1,
    fatherId: 0,
    menuName: '功能',
    icon: 'star',
    open: false,
    code: ActionCode.TabsDetail,
    selected: false,
    menuType: 'C',
    path: '/default/feat',
    children: [
      {
        id: 1,
        fatherId: 0,
        menuName: '消息提示',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/msg'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '文件下载',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/download'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '图标',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/icons'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '右键菜单',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/context-menu'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '图片预览',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/img-preview'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '全屏',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/full-screen'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '标签页操作',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/tabs'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '拖拽modal',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/ex-modal'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '封装抽屉',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/ex-drawer'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '富文本',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/rich-text'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: 'clickOutSide',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/click-out-side'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '外部文档',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/frame',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: 'zorro文档',
            icon: 'dashboard',
            open: false,
            code: ActionCode.TabsDetail,
            selected: false,
            menuType: 'C',
            path: '/default/feat/frame/zorro-doc'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '外部链接',
            icon: 'usergroup-delete',
            open: false,
            code: ActionCode.TabsDetail,
            selected: false,
            menuType: 'C',
            path: 'https://github.com/huajian123/ng-ant-admin',
            newLinkFlag: 1
          }
        ]
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '滚动条',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/scroll',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: '缓存滚动条',
            icon: 'dashboard',
            open: false,
            code: ActionCode.TabsDetail,
            selected: false,
            menuType: 'C',
            path: '/default/feat/scroll/keep-scroll-page'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '玩弄滚动条',
            icon: 'dashboard',
            open: false,
            code: ActionCode.TabsDetail,
            selected: false,
            menuType: 'C',
            path: '/default/feat/scroll/play-scroll'
          }
        ]
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '图表',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/charts',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: '高德',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'highlight',
            path: '/default/feat/charts/gaode-map',
            code: ActionCode.TabsDetail
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '百度',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'highlight',
            path: '/default/feat/charts/baidu-map',
            code: ActionCode.TabsDetail
          },
          {
            id: 1,
            fatherId: 0,
            menuName: 'Echarts',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'highlight',
            path: '/default/feat/charts/echarts',
            code: ActionCode.TabsDetail
          }
        ]
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '其他登录方式',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/blank/other-login',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: '第一种',
            open: false,
            selected: false,
            menuType: 'C',
            icon: 'highlight',
            path: '/blank/other-login/login1',
            code: ActionCode.TabsDetail
          }
        ]
      },

      {
        id: 1,
        fatherId: 0,
        menuName: '颜色选择器',
        icon: 'usergroup-delete',
        code: ActionCode.TabsDetail,
        open: false,
        selected: false,
        menuType: 'C',
        path: '/default/feat/color-sel'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '登录超时',
        icon: 'usergroup-delete',
        code: ActionCode.TabsDetail,
        open: false,
        selected: false,
        menuType: 'C',
        path: '/default/feat/session-timeout'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '水波纹',
        icon: 'usergroup-delete',
        code: ActionCode.TabsDetail,
        open: false,
        selected: false,
        menuType: 'C',
        path: '/default/feat/ripple'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '剪切板',
        icon: 'usergroup-delete',
        code: ActionCode.TabsDetail,
        open: false,
        selected: false,
        menuType: 'C',
        path: '/default/feat/copy'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '空白页',
        icon: 'usergroup-delete',
        code: ActionCode.TabsDetail,
        open: false,
        selected: false,
        menuType: 'C',
        path: '/blank/empty-page'
      },

      {
        id: 1,
        fatherId: 0,
        menuName: '代码编辑器',
        alIcon: 'icon-medium',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/editor'
      },

      {
        id: 1,
        fatherId: 0,
        menuName: '引导页',
        alIcon: 'icon-medium',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/feat/setup'
      }
    ]
  },
  {
    id: 1,
    fatherId: 0,
    menuName: '组件',
    icon: 'star',
    open: false,
    code: ActionCode.TabsDetail,
    selected: false,
    menuType: 'C',
    path: '/default/comp',
    children: [
      {
        id: 1,
        fatherId: 0,
        menuName: '基础组件',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/comp/basic'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '动画组件',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/comp/transition'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '在线excel',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/comp/luckysheet'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '组件懒加载',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/comp/lazy',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: '基础懒加载组件',
            icon: 'dashboard',
            open: false,
            code: ActionCode.TabsDetail,
            selected: false,
            menuType: 'C',
            path: '/default/comp/lazy/lazy-basic'
          },
          {
            id: 1,
            fatherId: 0,
            menuName: '滚动懒加载',
            icon: 'dashboard',
            open: false,
            code: ActionCode.TabsDetail,
            selected: false,
            menuType: 'C',
            path: '/default/comp/lazy/lazy-scroll'
          }
        ]
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '详情组件',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/comp/desc'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '密码强度校验组件',
        icon: 'dashboard',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/comp/strength-meter'
      }
    ]
  },

  {
    id: 1,
    fatherId: 0,
    menuName: '多级菜单',
    icon: 'menu',
    open: false,
    selected: false,
    menuType: 'C',
    code: ActionCode.TabsDetail,
    path: '/default/level',
    children: [
      {
        id: 1,
        fatherId: 0,
        menuName: 'Menu1',
        icon: 'menu',
        open: false,
        selected: false,
        menuType: 'C',
        code: ActionCode.TabsDetail,
        path: '/default/level/menu1',
        children: [
          {
            id: 1,
            fatherId: 0,
            menuName: 'Menu1-1',
            icon: 'menu',
            open: false,
            selected: false,
            menuType: 'C',
            code: ActionCode.TabsDetail,
            path: '/default/level/menu1/menu1-1',
            children: [
              {
                id: 1,
                fatherId: 0,
                menuName: 'Menu1-1-1',
                icon: 'menu',
                open: false,
                selected: false,
                menuType: 'C',
                code: ActionCode.TabsDetail,
                path: '/default/level/menu1/menu1-1/menu1-1-1'
              },
              {
                id: 1,
                fatherId: 0,
                menuName: 'Menu1-1-2',
                icon: 'menu',
                open: false,
                selected: false,
                menuType: 'C',
                code: ActionCode.TabsDetail,
                path: '/default/level/menu1/menu1-1/menu1-1-2'
              }
            ]
          },
          {
            id: 1,
            fatherId: 0,
            menuName: 'Menu1-2',
            icon: 'menu',
            open: false,
            selected: false,
            menuType: 'C',
            code: ActionCode.TabsDetail,
            path: '/default/level/menu1/menu1-2'
          }
        ]
      },
      {
        id: 1,
        fatherId: 0,
        menuName: 'Menu2',
        icon: 'menu',
        open: false,
        selected: false,
        menuType: 'C',
        code: ActionCode.TabsDetail,
        path: '/default/level/menu2'
      }
    ]
  },

  {
    id: 1,
    fatherId: 0,
    menuName: '系统管理',
    icon: '',
    alIcon: 'icon-mel-help',
    open: false,
    code: ActionCode.TabsDetail,
    selected: false,
    menuType: 'C',
    path: '/default/system',
    children: [
      {
        id: 1,
        fatherId: 0,
        menuName: '账号管理',
        icon: '',
        alIcon: 'icon-mel-help',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/system/account'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '角色管理',
        icon: '',
        alIcon: 'icon-mel-help',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/system/role-manager'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '菜单管理',
        icon: '',
        alIcon: 'icon-mel-help',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/system/menu'
      },
      {
        id: 1,
        fatherId: 0,
        menuName: '部门管理',
        icon: '',
        alIcon: 'icon-mel-help',
        open: false,
        code: ActionCode.TabsDetail,
        selected: false,
        menuType: 'C',
        path: '/default/system/dept'
      }
    ]
  },
  {
    id: 1,
    fatherId: 0,
    menuName: '关于',
    alIcon: 'icon-medium',
    open: false,
    code: ActionCode.TabsDetail,
    selected: false,
    menuType: 'C',
    path: '/default/about'
  }
];*/
