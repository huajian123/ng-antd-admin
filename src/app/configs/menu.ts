import {ActionCode} from './actionCode';
import {Menu} from '../core/services/types';

export const menuNav: Menu[] = [
  {
    title: 'Dashboard',
    icon: 'dashboard',
    open: false,
    selected: false,
    actionCode: ActionCode.Dashboard,
    children: [
      {
        title: '分析页',
        open: false,
        selected: false,
        path: '/default/dashboard/analysis',
      },
      {
        title: '监控页',
        open: false,
        selected: false,
        path: '/default/dashboard/monitor',
      },
      {
        title: '工作台',
        open: false,
        selected: false,
        path: '/default/dashboard/workbench',
      },
    ]
  },
  {
    title: '表单页',
    icon: 'form',
    open: false,
    selected: false,
    actionCode: ActionCode.FormModule,
    children: [
      {
        title: '基础表单',
        open: false,
        selected: false,
        path: '/default/form/base-form',
      },
      {
        title: '分布表单',
        open: false,
        selected: false,
        path: '/default/form/step-form',
      },
      {
        title: '高级表单',
        open: false,
        selected: false,
        path: '/default/form/advanced-form',
      },
    ]
  },
  {
    title: '列表页',
    icon: 'table',
    open: false,
    selected: false,
    actionCode: ActionCode.ListModule,
    children: [
    /*  {
        title: '搜索列表',
        open: false,
        selected: false,
        path: '/list/search-list',
        children: [
          {
            title: '搜索列表(文章）',
            open: false,
            selected: false,
            path: '/list/search-list/acticle',
          },
          {
            title: '搜索列表(项目)',
            open: false,
            selected: false,
            path: '/list/search-list/project',
          },
          {
            title: '搜索列表(应用)',
            open: false,
            selected: false,
            path: '/list/search-list/app',
          },
        ]
      },*/
      {
        title: '查询表格',
        open: false,
        selected: false,
        path: '/default/list/search-table',
      },
     /* {
        title: '标准表格',
        open: false,
        selected: false,
        path: '/custom-table',
      },
      {
        title: '卡片列表',
        open: false,
        selected: false,
        path: '/card-table',
      },*/
    ]
  },
  {
    title: '详情页',
    icon: 'profile',
    open: false,
    selected: false,
    actionCode: ActionCode.DetailModule,
    children: [
      {
        title: '基础详情页',
        open: false,
        selected: false,
        path: '/default/detail/base-detail',
      },
     /* {
        title: '高级详情页',
        open: false,
        selected: false,
        path: '/detail-adv',
      },*/
    ]
  },
  {
    title: '结果页',
    icon: 'check-circle',
    open: false,
    selected: false,
    actionCode: ActionCode.ResultModule,
    children: [
      {
        title: '成功页',
        open: false,
        selected: false,
        path: '/default/result/success',
      },
      {
        title: '失败页',
        open: false,
        selected: false,
        path: '/default/result/fail',
      },
    ]
  },
  {
    title: '异常页',
    icon: 'warning',
    open: false,
    selected: false,
    actionCode: ActionCode.ErrorModule,
    children: [
      {
        title: '403',
        open: false,
        selected: false,
        path: '/default/except/except403',
      },
      {
        title: '404',
        open: false,
        selected: false,
        path: '/default/except/except404',
      },
      {
        title: '500',
        open: false,
        selected: false,
        path: '/default/except/except500',
      },
    ]
  },
  {
    title: '个人页',
    icon: 'user',
    open: false,
    selected: false,
    actionCode: ActionCode.PersonalModule,
    children: [
      {
        title: '个人中心',
        open: false,
        selected: false,
        path: '/default/personal/personal-center',
      },
      {
        title: '个人设置',
        open: false,
        selected: false,
        path: '/default/personal/personal-setting',
      },
    ]
  },
  {
    title: '内部管理',
    icon: 'highlight',
    open: false,
    selected: false,
    actionCode: ActionCode.InternalModule,
    children: [
      {
        title: '用户管理',
        open: false,
        selected: false,
        path: '/default/internal-manage/user-manage',
        actionCode: ActionCode.UserManage,
      },
      {
        title: '角色管理',
        open: false,
        selected: false,
        path: '/default/internal-manage/role-manage',
        actionCode: ActionCode.Role,
      },
      {
        title: '部门管理',
        open: false,
        selected: false,
        path: '/default/internal-manage/dept-manage',
        actionCode: ActionCode.Dept,
      },
    ]
  },
];
