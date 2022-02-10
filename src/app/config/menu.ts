import {ActionCode} from './actionCode';
import {Menu} from '@core/services/types';
import {InjectionToken} from "@angular/core";


export const MENU_TOKEN = new InjectionToken<Menu[]>('menu-token', {
  providedIn: 'root', factory(): Menu[] {
    return menuNav;
  }
})

const menuNav: Menu[] = [
  {
    title: '拓展功能',
    icon: 'star',
    open: false,
    actionCode: ActionCode.UserManage,
    selected: false,
    path: '/default/feat',
    children: [
      {
        title: '拖拽modal',
        icon: 'dashboard',
        open: false,
        actionCode: ActionCode.UserManage,
        selected: false,
        path: '/default/feat/ex-modal',
      },
      {
        title: '其他登录方式',
        icon: 'dashboard',
        open: false,
        actionCode: ActionCode.UserManage,
        selected: false,
        path: '/blank/other-login',
        children: [
          {
            title: '第一种',
            open: false,
            selected: false,
            icon: 'highlight',
            path: '/blank/other-login/login1',
            actionCode: ActionCode.UserManage,
          },
        ]
      },
      {
        title: '图形编辑器',
        icon: 'dashboard',
        open: false,
        actionCode: ActionCode.UserManage,
        selected: false,
        path: '/default/feat/flow',
        children: [
          {
            title: '流程图',
            open: false,
            selected: false,
            icon: 'highlight',
            path: '/default/feat/flow/flow-chat',
            actionCode: ActionCode.UserManage,
          },
        ]
      },
      {
        title: '空白页',
        icon: 'usergroup-delete',
        actionCode: ActionCode.UserManage,
        open: false,
        selected: false,
        path: '/blank/empty-page',
      },
      {
        title: '外部链接',
        icon: 'usergroup-delete',
        open: false,
        actionCode: ActionCode.UserManage,
        selected: false,
        path: 'https://github.com/huajian123/ng-ant-admin',
        isNewLink: true,
      },
    ]
  },
  {
    title: 'Dashboard',
    icon: 'dashboard',
    open: false,
    selected: false,
    path: '/default/dashboard',
    actionCode: ActionCode.UserManage,
    children: [
      {
        title: '分析页',
        open: false,
        selected: false,
        actionCode: ActionCode.UserManage,
        icon: 'dashboard',
        path: '/default/dashboard/analysis',
      },
      {
        title: '监控页',
        open: false,
        selected: false,
        actionCode: ActionCode.UserManage,
        icon: 'dashboard',
        path: '/default/dashboard/monitor',
      },
      {
        title: '工作台',
        open: false,
        selected: false,
        actionCode: ActionCode.UserManage,
        icon: 'dashboard',
        path: '/default/dashboard/workbench',
      },
    ]
  },
  {
    title: '表单页',
    icon: 'form',
    open: false,
    selected: false,
    actionCode: ActionCode.UserManage,
    path: '/default/form',
    children: [
      {
        title: '基础表单',
        open: false,
        selected: false,
        icon: 'form',
        actionCode: ActionCode.UserManage,
        path: '/default/form/base-form',
      },
      {
        title: '分步表单',
        open: false,
        selected: false,
        actionCode: ActionCode.UserManage,
        icon: 'form',
        path: '/default/form/step-form',
      },
      {
        title: '高级表单',
        open: false,
        selected: false,
        actionCode: ActionCode.UserManage,
        icon: 'form',
        path: '/default/form/advanced-form',
      },
    ]
  },
  {
    title: '列表页',
    icon: 'table',
    open: false,
    selected: false,
    actionCode: ActionCode.UserManage,
    path: '/default/list',
    children: [
      {
        title: '搜索列表',
        open: false,
        selected: false,
        actionCode: ActionCode.UserManage,
        icon: 'table',
        children: [
          {
            title: '搜索列表(文章）',
            open: false,
            selected: false,
            icon: 'table',
            actionCode: ActionCode.UserManage,
            path: '/default/list/search-list/article',
          },
          {
            title: '搜索列表(项目)',
            open: false,
            selected: false,
            icon: 'table',
            actionCode: ActionCode.UserManage,
            path: '/default/list/search-list/project',
          },
          {
            title: '搜索列表(应用)',
            open: false,
            selected: false,
            icon: 'table',
            actionCode: ActionCode.UserManage,
            path: '/default/list/search-list/application',
          },
        ]
      },
      {
        title: '查询表格',
        open: false,
        selected: false,
        icon: 'table',
        actionCode: ActionCode.UserManage,
        path: '/default/list/search-table',
      },
      {
        title: '标准表格',
        open: false,
        selected: false,
        icon: 'table',
        actionCode: ActionCode.UserManage,
        path: '/default/list/standard-table',
      },
      {
        title: '卡片列表',
        open: false,
        selected: false,
        icon: 'table',
        actionCode: ActionCode.UserManage,
        path: '/default/list/card-table',
      },
    ]
  },
  {
    title: '详情页',
    icon: 'profile',
    open: false,
    selected: false,
    actionCode: ActionCode.UserManage,
    path: '/default/detail',
    children: [
      {
        title: '基础详情页',
        open: false,
        selected: false,
        actionCode: ActionCode.UserManage,
        icon: 'profile',
        path: '/default/detail/base-detail',
      },
      {
        title: '高级详情页',
        open: false,
        selected: false,
        actionCode: ActionCode.UserManage,
        icon: 'profile',
        path: '/default/detail/adv-detail',
      },
    ]
  },
  {
    title: '结果页',
    icon: 'check-circle',
    open: false,
    selected: false,
    actionCode: ActionCode.UserManage,
    path: '/default/result',
    children: [
      {
        title: '成功页',
        open: false,
        selected: false,
        icon: 'check-circle',
        actionCode: ActionCode.UserManage,
        path: '/default/result/success',
      },
      {
        title: '失败页',
        open: false,
        selected: false,
        actionCode: ActionCode.UserManage,
        icon: 'check-circle',
        path: '/default/result/fail',
      },
    ]
  },
  {
    title: '异常页',
    icon: 'warning',
    open: false,
    selected: false,
    actionCode: ActionCode.UserManage,
    path: '/default/except',
    children: [
      {
        title: '403',
        open: false,
        actionCode: ActionCode.UserManage,
        selected: false,
        icon: 'warning',
        path: '/default/except/except403',
      },
      {
        title: '404',
        open: false,
        selected: false,
        icon: 'warning',
        actionCode: ActionCode.UserManage,
        path: '/default/except/except404',
      },
      {
        title: '500',
        open: false,
        selected: false,
        actionCode: ActionCode.UserManage,
        icon: 'warning',
        path: '/default/except/except500',
      },
    ]
  },
  {
    title: '个人页',
    icon: 'user',
    open: false,
    selected: false,
    actionCode: ActionCode.UserManage,
    path: '/default/personal',
    children: [
      {
        title: '个人中心',
        open: false,
        selected: false,
        icon: 'user',
        actionCode: ActionCode.UserManage,
        path: '/default/personal/personal-center',
      },
      {
        title: '个人设置',
        open: false,
        actionCode: ActionCode.UserManage,
        selected: false,
        icon: 'user',
        path: '/default/personal/personal-setting',
      },
    ]
  },
  /*    {
      title: '内部管理',
      icon: 'highlight',
      open: false,
      selected: false,
      actionCode: ActionCode.InternalModule,
      path: '/default/internal-manage',
      children: [
        {
          title: '用户管理',
          open: false,
          selected: false,
          icon: 'highlight',
          path: '/default/internal-manage/user-manage',
          actionCode: ActionCode.UserManage,
        },
        {
          title: '角色管理',
          open: false,
          selected: false,
          icon: 'highlight',
          path: '/default/internal-manage/role-manage',
          actionCode: ActionCode.Role,
        },
        {
          title: '部门管理',
          open: false,
          selected: false,
          icon: 'highlight',
          path: '/default/internal-manage/dept-manage',
          actionCode: ActionCode.Dept,
        },
      ]
    },*/

];
