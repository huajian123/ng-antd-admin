import { http, HttpResponse } from 'msw';

interface Menu {
  id: number;
  fatherId: number;
  menuName: string;
  menuType: string;
  alIcon: string;
  icon: string;
  path: string;
  code: string;
  orderNum: number;
  status: boolean;
  newLinkFlag: boolean;
  visible: boolean;
}

let menus: Menu[] = [
  { id: 1, fatherId: 0, menuName: 'Dashboard', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/dashboard', code: 'default:dashboard', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 2, fatherId: 0, menuName: '页面', menuType: 'C', alIcon: '', icon: 'appstore', path: '/default/page-demo', code: 'default:page-demo', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 3, fatherId: 0, menuName: '功能', menuType: 'C', alIcon: '', icon: 'star', path: '/default/feat', code: 'default:feat', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 4, fatherId: 0, menuName: '组件', menuType: 'C', alIcon: '', icon: 'star', path: '/default/comp', code: 'default:comp', orderNum: 4, status: true, newLinkFlag: false, visible: true },
  { id: 5, fatherId: 0, menuName: '多级菜单', menuType: 'C', alIcon: '', icon: 'menu', path: '/default/level', code: 'default:level', orderNum: 5, status: true, newLinkFlag: false, visible: true },
  { id: 6, fatherId: 0, menuName: '系统管理', menuType: 'C', alIcon: '', icon: 'menu', path: '/default/system', code: 'default:system', orderNum: 6, status: true, newLinkFlag: false, visible: true },
  { id: 7, fatherId: 0, menuName: '关于', menuType: 'C', alIcon: '', icon: 'apple', path: '/default/about', code: 'default:about', orderNum: 7, status: true, newLinkFlag: false, visible: true },
  { id: 8, fatherId: 1, menuName: '分析页', menuType: 'C', alIcon: '', icon: 'fund', path: '/default/dashboard/analysis', code: 'default:dashboard:analysis', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 9, fatherId: 1, menuName: '监控页', menuType: 'C', alIcon: '', icon: 'fund', path: '/default/dashboard/monitor', code: 'default:dashboard:monitor', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 10, fatherId: 1, menuName: '工作台', menuType: 'C', alIcon: '', icon: 'appstore', path: '/default/dashboard/workbench', code: 'default:dashboard:workbench', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 11, fatherId: 2, menuName: '表单页', menuType: 'C', alIcon: '', icon: 'form', path: '/default/page-demo/form', code: 'default:page-demo:form', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 12, fatherId: 2, menuName: '列表页', menuType: 'C', alIcon: '', icon: 'table', path: '/default/page-demo/list', code: 'default:page-demo:list', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 13, fatherId: 2, menuName: '详情页', menuType: 'C', alIcon: '', icon: 'profile', path: '/default/page-demo/detail', code: 'default:page-demo:detail', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 14, fatherId: 2, menuName: '结果页', menuType: 'C', alIcon: '', icon: 'check-circle', path: '/default/page-demo/result', code: 'default:page-demo:result', orderNum: 4, status: true, newLinkFlag: false, visible: true },
  { id: 15, fatherId: 2, menuName: '异常页', menuType: 'C', alIcon: '', icon: 'warning', path: '/default/page-demo/except', code: 'default:page-demo:except', orderNum: 5, status: true, newLinkFlag: false, visible: true },
  { id: 16, fatherId: 2, menuName: '个人页', menuType: 'C', alIcon: '', icon: 'user', path: '/default/page-demo/personal', code: 'default:page-demo:personal', orderNum: 6, status: true, newLinkFlag: false, visible: true },
  { id: 17, fatherId: 2, menuName: '图形编辑器', menuType: 'C', alIcon: 'icon-mel-help', icon: '', path: '/default/page-demo/flow', code: 'default:page-demo:flow', orderNum: 7, status: true, newLinkFlag: false, visible: true },
  { id: 18, fatherId: 2, menuName: '任务', menuType: 'C', alIcon: '', icon: 'border-bottom', path: '/default/page-demo/task', code: 'default:page-demo:task', orderNum: 8, status: true, newLinkFlag: false, visible: true },
  { id: 19, fatherId: 2, menuName: '新布局', menuType: 'C', alIcon: '', icon: 'caret-down', path: '/default/page-demo/new-layout', code: 'default:page-demo:new-layout', orderNum: 9, status: true, newLinkFlag: false, visible: true },
  { id: 23, fatherId: 3, menuName: '消息提示', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/msg', code: 'default:feat:msg', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 24, fatherId: 3, menuName: '图标', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/icons', code: 'default:feat:icons', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 25, fatherId: 3, menuName: '右键菜单', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/context-menu', code: 'default:feat:context-menu', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 26, fatherId: 3, menuName: '图片预览', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/img-preview', code: 'default:feat:img-preview', orderNum: 4, status: true, newLinkFlag: false, visible: true },
  { id: 27, fatherId: 3, menuName: '全屏', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/full-screen', code: 'default:feat:full-screen', orderNum: 5, status: true, newLinkFlag: false, visible: true },
  { id: 28, fatherId: 3, menuName: '标签页操作', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/tabs', code: 'default:feat:tabs', orderNum: 6, status: true, newLinkFlag: false, visible: true },
  { id: 29, fatherId: 3, menuName: '拖拽modal', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/ex-modal', code: 'default:feat:ex-modal', orderNum: 7, status: true, newLinkFlag: false, visible: true },
  { id: 30, fatherId: 3, menuName: '封装抽屉', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/ex-drawer', code: 'default:feat:ex-drawer', orderNum: 8, status: true, newLinkFlag: false, visible: true },
  { id: 31, fatherId: 3, menuName: '富文本', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/rich-text', code: 'default:feat:rich-text', orderNum: 9, status: true, newLinkFlag: false, visible: true },
  { id: 32, fatherId: 3, menuName: 'clickOutSide', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/click-out-side', code: 'default:feat:click-out-side', orderNum: 10, status: true, newLinkFlag: false, visible: true },
  { id: 33, fatherId: 3, menuName: '外部文档', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/frame', code: 'default:feat:frame', orderNum: 11, status: true, newLinkFlag: false, visible: true },
  { id: 34, fatherId: 3, menuName: '滚动条', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/scroll', code: 'default:feat:scroll', orderNum: 12, status: true, newLinkFlag: false, visible: true },
  { id: 35, fatherId: 3, menuName: '图表', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/charts', code: 'default:feat:charts', orderNum: 13, status: true, newLinkFlag: false, visible: true },
  { id: 36, fatherId: 3, menuName: '其他登录方式', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/blank/other-login', code: 'blank:other-login', orderNum: 14, status: true, newLinkFlag: false, visible: true },
  { id: 37, fatherId: 3, menuName: '颜色选择器', menuType: 'C', alIcon: '', icon: 'usergroup-delete', path: '/default/feat/color-sel', code: 'default:feat:color-sel', orderNum: 15, status: true, newLinkFlag: false, visible: true },
  { id: 38, fatherId: 3, menuName: '水波纹', menuType: 'C', alIcon: '', icon: 'usergroup-delete', path: '/default/feat/ripple', code: 'default:feat:ripple', orderNum: 16, status: true, newLinkFlag: false, visible: true },
  { id: 39, fatherId: 3, menuName: '剪切板', menuType: 'C', alIcon: '', icon: 'usergroup-delete', path: '/default/feat/copy', code: 'default:feat:copy', orderNum: 17, status: true, newLinkFlag: false, visible: true },
  { id: 40, fatherId: 3, menuName: '空白页', menuType: 'C', alIcon: '', icon: 'usergroup-delete', path: '/blank/empty-page', code: 'blank:empty-page', orderNum: 18, status: true, newLinkFlag: false, visible: true },
  { id: 41, fatherId: 3, menuName: '引导页', menuType: 'C', alIcon: '', icon: 'codepen', path: '/default/feat/setup', code: 'default:feat:setup', orderNum: 19, status: true, newLinkFlag: false, visible: true },
  { id: 42, fatherId: 3, menuName: '登录超时', menuType: 'C', alIcon: '', icon: 'yuque', path: '/default/feat/session-timeout', code: 'default:feat:session-timeout', orderNum: 20, status: true, newLinkFlag: false, visible: true },
  { id: 43, fatherId: 3, menuName: 'websocket', menuType: 'C', alIcon: '', icon: 'border-horizontal', path: '/default/feat/websocket', code: 'default:feat:websocket', orderNum: 21, status: true, newLinkFlag: false, visible: true },
  { id: 44, fatherId: 3, menuName: '文件下载', menuType: 'C', alIcon: '', icon: 'arrow-down', path: '/default/feat/download', code: 'default:feat:download', orderNum: 23, status: true, newLinkFlag: false, visible: true },
  { id: 45, fatherId: 3, menuName: '文件上传', menuType: 'C', alIcon: '', icon: 'up', path: '/default/feat/upload', code: 'default:feat:upload', orderNum: 22, status: true, newLinkFlag: false, visible: true },
  { id: 46, fatherId: 3, menuName: '二维码', menuType: 'C', alIcon: '', icon: 'gitlab', path: '/default/feat/qrcode', code: 'default:feat:qrcode', orderNum: 24, status: true, newLinkFlag: false, visible: true },
  { id: 47, fatherId: 3, menuName: '水印', menuType: 'C', alIcon: '', icon: 'windows', path: '/default/feat/water-mark', code: 'default:feat:water-mark', orderNum: 25, status: true, newLinkFlag: false, visible: true },
  { id: 48, fatherId: 3, menuName: 'KeepAlive', menuType: 'C', alIcon: '', icon: 'border-horizontal', path: '/default/feat/keep-alive', code: 'default:feat:keep-alive', orderNum: 26, status: true, newLinkFlag: false, visible: true },
  { id: 49, fatherId: 4, menuName: '基础组件', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/comp/basic', code: 'default:comp:basic', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 50, fatherId: 4, menuName: '动画组件', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/comp/transition', code: 'default:comp:transition', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 51, fatherId: 4, menuName: '在线excel', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/comp/luckysheet', code: 'default:comp:luckysheet', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 52, fatherId: 4, menuName: '组件懒加载', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/comp/lazy', code: 'default:comp:lazy', orderNum: 4, status: true, newLinkFlag: false, visible: true },
  { id: 53, fatherId: 4, menuName: '详情组件', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/comp/desc', code: 'default:comp:desc', orderNum: 5, status: true, newLinkFlag: false, visible: true },
  { id: 54, fatherId: 4, menuName: '密码强度校验组件', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/comp/strength-meter', code: 'default:comp:strength-meter', orderNum: 6, status: true, newLinkFlag: false, visible: true },
  { id: 55, fatherId: 4, menuName: 'Form', menuType: 'C', alIcon: '', icon: 'form', path: '/default/comp/form', code: 'default:comp:form', orderNum: 7, status: true, newLinkFlag: false, visible: true },
  { id: 56, fatherId: 4, menuName: 'blingbling', menuType: 'C', alIcon: '', icon: 'caret-down', path: '/default/comp/blingbling', code: 'default:comp:blingbling', orderNum: 8, status: true, newLinkFlag: false, visible: true },
  { id: 57, fatherId: 5, menuName: 'Menu1', menuType: 'C', alIcon: '', icon: 'menu', path: '/default/level/menu1', code: 'default:level:menu1', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 58, fatherId: 5, menuName: 'Menu2', menuType: 'C', alIcon: '', icon: 'menu', path: '/default/level/menu2', code: 'default:level:menu2', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 59, fatherId: 6, menuName: '账号管理', menuType: 'C', alIcon: '', icon: 'menu', path: '/default/system/account', code: 'default:system:account', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 60, fatherId: 6, menuName: '角色管理', menuType: 'C', alIcon: 'icon-mel-help', icon: '', path: '/default/system/role-manager', code: 'default:system:role-manager', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 61, fatherId: 6, menuName: '菜单管理', menuType: 'C', alIcon: '', icon: 'menu', path: '/default/system/menu', code: 'default:system:menu', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 62, fatherId: 6, menuName: '部门管理', menuType: 'C', alIcon: 'icon-mel-help', icon: '', path: '/default/system/dept', code: 'default:system:dept', orderNum: 4, status: true, newLinkFlag: false, visible: true },
  { id: 63, fatherId: 11, menuName: '基础表单', menuType: 'C', alIcon: '', icon: 'form', path: '/default/page-demo/form/base-form', code: 'default:page-demo:form:base-form', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 64, fatherId: 11, menuName: '分步表单', menuType: 'C', alIcon: '', icon: 'form', path: '/default/page-demo/form/step-form', code: 'default:page-demo:form:step-form', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 65, fatherId: 11, menuName: '高级表单', menuType: 'C', alIcon: '', icon: 'form', path: '/default/page-demo/form/advanced-form', code: 'default:page-demo:form:advanced-form', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 66, fatherId: 12, menuName: '搜索列表', menuType: 'C', alIcon: '', icon: '', path: '/default/page-demo/list/search-list', code: 'default:page-demo:list:search-list', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 67, fatherId: 12, menuName: '查询表格', menuType: 'C', alIcon: '', icon: 'table', path: '/default/page-demo/list/search-table', code: 'default:page-demo:list:search-table', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 68, fatherId: 12, menuName: '树状表格', menuType: 'C', alIcon: '', icon: 'table', path: '/default/page-demo/list/tree-list', code: 'default:page-demo:list:tree-list', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 69, fatherId: 12, menuName: '标准表格', menuType: 'C', alIcon: '', icon: 'table', path: '/default/page-demo/list/standard-table', code: 'default:page-demo:list:standard-table', orderNum: 4, status: true, newLinkFlag: false, visible: true },
  { id: 70, fatherId: 12, menuName: '卡片列表', menuType: 'C', alIcon: '', icon: 'table', path: '/default/page-demo/list/card-table', code: 'default:page-demo:list:card-table', orderNum: 5, status: true, newLinkFlag: false, visible: true },
  { id: 71, fatherId: 13, menuName: '基础详情页', menuType: 'C', alIcon: '', icon: 'profile', path: '/default/page-demo/detail/base-detail', code: 'default:page-demo:detail:base-detail', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 72, fatherId: 13, menuName: '高级详情页', menuType: 'C', alIcon: '', icon: 'profile', path: '/default/page-demo/detail/adv-detail', code: 'default:page-demo:detail:adv-detail', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 73, fatherId: 14, menuName: '成功页', menuType: 'C', alIcon: '', icon: 'check-circle', path: '/default/page-demo/result/success', code: 'default:page-demo:result:success', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 74, fatherId: 14, menuName: '失败页', menuType: 'C', alIcon: '', icon: 'check-circle', path: '/default/page-demo/result/fail', code: 'default:page-demo:result:fail', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 75, fatherId: 15, menuName: '403', menuType: 'C', alIcon: '', icon: 'warning', path: '/default/page-demo/except/except403', code: 'default:page-demo:except:except403', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 76, fatherId: 15, menuName: '404', menuType: 'C', alIcon: '', icon: 'warning', path: '/default/page-demo/except/except404', code: 'default:page-demo:except:except404', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 77, fatherId: 15, menuName: '500', menuType: 'C', alIcon: '', icon: 'warning', path: '/default/page-demo/except/except500', code: 'default:page-demo:except:except500', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 78, fatherId: 15, menuName: '网络错误', menuType: 'C', alIcon: '', icon: 'warning', path: '/default/page-demo/except/network-error', code: 'default:page-demo:except:network-error', orderNum: 4, status: true, newLinkFlag: false, visible: true },
  { id: 79, fatherId: 15, menuName: '无数据', menuType: 'C', alIcon: '', icon: 'warning', path: '/default/page-demo/except/no-data', code: 'default:page-demo:except:no-data', orderNum: 5, status: true, newLinkFlag: false, visible: true },
  { id: 80, fatherId: 16, menuName: '个人中心', menuType: 'C', alIcon: '', icon: 'user', path: '/default/page-demo/personal/personal-center', code: 'default:page-demo:personal:personal-center', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 81, fatherId: 16, menuName: '个人设置', menuType: 'C', alIcon: '', icon: 'user', path: '/default/page-demo/personal/personal-setting', code: 'default:page-demo:personal:personal-setting', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 82, fatherId: 17, menuName: '流程图', menuType: 'C', alIcon: '', icon: 'highlight', path: '/default/page-demo/flow/flow-chat', code: 'default:page-demo:flow:flow-chat', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 83, fatherId: 33, menuName: 'zorro文档', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/frame/zorro-doc', code: 'default:feat:frame:zorro-doc', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 84, fatherId: 33, menuName: '外部链接', menuType: 'C', alIcon: '', icon: 'usergroup-delete', path: 'https://github.com/huajian123/ng-antd-admin', code: 'default:feat:frame:other-link', orderNum: 2, status: true, newLinkFlag: true, visible: true },
  { id: 85, fatherId: 34, menuName: '缓存滚动条', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/scroll/keep-scroll-page', code: 'default:feat:scroll:keep-scroll-page', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 86, fatherId: 34, menuName: '玩弄滚动条', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/feat/scroll/play-scroll', code: 'default:feat:scroll:play-scroll', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 87, fatherId: 35, menuName: '高德', menuType: 'C', alIcon: '', icon: 'highlight', path: '/default/feat/charts/gaode-map', code: 'default:feat:charts:gaode-map', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 88, fatherId: 35, menuName: '百度', menuType: 'C', alIcon: '', icon: 'highlight', path: '/default/feat/charts/baidu-map', code: 'default:feat:charts:baidu-map', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 89, fatherId: 35, menuName: 'Echarts', menuType: 'C', alIcon: '', icon: 'highlight', path: '/default/feat/charts/echarts', code: 'default:feat:charts:echarts', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 90, fatherId: 36, menuName: '第一种', menuType: 'C', alIcon: '', icon: 'highlight', path: '/blank/other-login/login1', code: 'blank:other-login:login1', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 91, fatherId: 52, menuName: '基础懒加载组件', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/comp/lazy/lazy-basic', code: 'default:comp:lazy:lazy-basic', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 92, fatherId: 52, menuName: '滚动懒加载', menuType: 'C', alIcon: '', icon: 'dashboard', path: '/default/comp/lazy/lazy-scroll', code: 'default:comp:lazy:lazy-scroll', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 93, fatherId: 55, menuName: '可收缩表单', menuType: 'C', alIcon: '', icon: 'minus-square', path: '/default/comp/form/shrink-form', code: 'default:comp:form:shrink-form', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 94, fatherId: 55, menuName: '表单增删', menuType: 'C', alIcon: '', icon: 'chrome', path: '/default/comp/form/append-form', code: 'default:comp:form:append-form', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 95, fatherId: 57, menuName: 'Menu1-1', menuType: 'C', alIcon: '', icon: '', path: '/default/level/menu1/menu1-1', code: 'default:level:menu1:menu1-1', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 96, fatherId: 57, menuName: 'Menu1-2', menuType: 'C', alIcon: '', icon: 'menu', path: '/default/level/menu1/menu1-2', code: 'default:level:menu1:menu1-2', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 97, fatherId: 59, menuName: '账号管理新增', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:account:add', orderNum: 1, status: true, newLinkFlag: false, visible: false },
  { id: 98, fatherId: 59, menuName: '账号管理编辑', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:account:edit', orderNum: 2, status: true, newLinkFlag: false, visible: false },
  { id: 99, fatherId: 59, menuName: '账号管理删除', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:account:del', orderNum: 3, status: true, newLinkFlag: false, visible: false },
  { id: 100, fatherId: 60, menuName: '角色管理新增', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:role-manager:add', orderNum: 1, status: true, newLinkFlag: false, visible: false },
  { id: 101, fatherId: 60, menuName: '角色管理编辑', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:role-manager:edit', orderNum: 2, status: true, newLinkFlag: false, visible: false },
  { id: 102, fatherId: 60, menuName: '角色管理删除', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:role-manager:del', orderNum: 3, status: true, newLinkFlag: false, visible: false },
  { id: 103, fatherId: 60, menuName: '角色管理设置角色', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:role-manager:set-role', orderNum: 4, status: true, newLinkFlag: false, visible: false },
  { id: 104, fatherId: 61, menuName: '菜单管理新增', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:menu:add', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 105, fatherId: 61, menuName: '菜单管理编辑', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:menu:edit', orderNum: 2, status: true, newLinkFlag: false, visible: false },
  { id: 106, fatherId: 61, menuName: '菜单管理删除', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:menu:del', orderNum: 3, status: true, newLinkFlag: false, visible: false },
  { id: 107, fatherId: 61, menuName: '菜单管理添加下级', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:menu:addlowlevel', orderNum: 4, status: true, newLinkFlag: false, visible: false },
  { id: 108, fatherId: 62, menuName: '部门管理新增', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:dept:add', orderNum: 1, status: true, newLinkFlag: false, visible: false },
  { id: 109, fatherId: 62, menuName: '部门管理编辑', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:dept:edit', orderNum: 2, status: true, newLinkFlag: false, visible: false },
  { id: 110, fatherId: 62, menuName: '部门管理删除', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:dept:del', orderNum: 3, status: true, newLinkFlag: false, visible: false },
  { id: 111, fatherId: 62, menuName: '部门管理添加下级', menuType: 'F', alIcon: '', icon: '', path: '', code: 'default:system:dept:addlowlevel', orderNum: 4, status: true, newLinkFlag: false, visible: false },
  { id: 112, fatherId: 66, menuName: '搜索列表(文章)', menuType: 'C', alIcon: '', icon: 'table', path: '/default/page-demo/list/search-list/article', code: 'default:page-demo:list:search-list:article', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 113, fatherId: 66, menuName: '搜索列表(项目)', menuType: 'C', alIcon: '', icon: 'table', path: '/default/page-demo/list/search-list/project', code: 'default:page-demo:list:search-list:project', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 114, fatherId: 66, menuName: '搜索列表(应用)', menuType: 'C', alIcon: '', icon: 'table', path: '/default/page-demo/list/search-list/application', code: 'default:page-demo:list:search-list:application', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 115, fatherId: 95, menuName: 'Menu1-1-1', menuType: 'C', alIcon: '', icon: '', path: '/default/level/menu1/menu1-1/menu1-1-1', code: 'default:level:menu1:menu1-1:menu1-1-1', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 116, fatherId: 95, menuName: 'Menu1-1-2', menuType: 'C', alIcon: '', icon: '', path: '/default/level/menu1/menu1-1/menu1-1-2', code: 'default:level:menu1:menu1-1:menu1-1-2', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 117, fatherId: 3, menuName: '过渡', menuType: 'C', alIcon: '', icon: 'logout', path: '/default/feat/transitions', code: 'default:feat:transitions', orderNum: 27, status: true, newLinkFlag: false, visible: true },
  { id: 118, fatherId: 52, menuName: 'defer演示', menuType: 'C', alIcon: '', icon: 'logout', path: '/default/comp/lazy/lazy-defer', code: 'default:comp:lazy:lazy-defer', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 119, fatherId: 52, menuName: '懒加载script脚本', menuType: 'C', alIcon: '', icon: 'login', path: '/default/comp/lazy/lazy-loadscript', code: 'default:comp:lazy:lazy-loadscript', orderNum: 4, status: true, newLinkFlag: false, visible: true },
  { id: 120, fatherId: 52, menuName: '动态组件', menuType: 'C', alIcon: '', icon: 'up-circle', path: '/default/comp/lazy/dynamic-comp', code: 'default:comp:lazy:dynamic-comp', orderNum: 5, status: true, newLinkFlag: false, visible: true },
  { id: 121, fatherId: 3, menuName: 'Signal演示', menuType: 'C', alIcon: '', icon: 'slack-square', path: '/default/feat/signal-demo', code: 'default:feat:signal-demo', orderNum: 28, status: true, newLinkFlag: false, visible: true },
  { id: 122, fatherId: 121, menuName: '基础与进阶', menuType: 'C', alIcon: '', icon: 'rollback', path: '/default/feat/signal-demo/basic-advanced', code: 'default:feat:signal-demo:basic-advanced', orderNum: 1, status: true, newLinkFlag: false, visible: true },
  { id: 123, fatherId: 121, menuName: 'linkedSignal演示', menuType: 'C', alIcon: '', icon: 'border-horizontal', path: '/default/feat/signal-demo/linked-signal-demo', code: 'default:feat:signal-demo:linked-signal-demo', orderNum: 2, status: true, newLinkFlag: false, visible: true },
  { id: 124, fatherId: 121, menuName: '性能优化', menuType: 'C', alIcon: '', icon: 'alipay-circle', path: '/default/feat/signal-demo/performance-optimization', code: 'default:feat:signal-demo:performance-optimization', orderNum: 3, status: true, newLinkFlag: false, visible: true },
  { id: 125, fatherId: 121, menuName: 'resource演示', menuType: 'C', alIcon: '', icon: 'play-circle', path: '/default/feat/signal-demo/resource', code: 'default:feat:signal-demo:resource', orderNum: 4, status: true, newLinkFlag: false, visible: true },
  { id: 126, fatherId: 121, menuName: '跨组件通信', menuType: 'C', alIcon: '', icon: 'up-circle', path: '/default/feat/signal-demo/cross-comp-communication', code: 'default:feat:signal-demo:cross-comp-communication', orderNum: 5, status: true, newLinkFlag: false, visible: true },
  { id: 127, fatherId: 121, menuName: '与Observable互转', menuType: 'C', alIcon: '', icon: 'border-inner', path: '/default/feat/signal-demo/change-to-observable', code: 'default:feat:signal-demo:change-to-observable', orderNum: 6, status: true, newLinkFlag: false, visible: true },
  { id: 128, fatherId: 121, menuName: 'Signal&Reactive Forms', menuType: 'C', alIcon: '', icon: 'caret-left', path: '/default/feat/signal-demo/signal-reactive-forms', code: 'default:feat:signal-demo:signal-reactive-forms', orderNum: 7, status: true, newLinkFlag: false, visible: true },
  { id: 129, fatherId: 121, menuName: '综合实战', menuType: 'C', alIcon: '', icon: 'instagram', path: '/default/feat/signal-demo/signal-comprehensive-practical', code: 'default:feat:signal-demo:signal-comprehensive-practical', orderNum: 8, status: true, newLinkFlag: false, visible: true },
  { id: 130, fatherId: 3, menuName: '多语言', menuType: 'C', alIcon: '', icon: 'menu-fold', path: '/default/feat/multilingual', code: 'default:feat:multilingual', orderNum: 29, status: true, newLinkFlag: false, visible: true },
];

let nextId = 131;

export const menu = [
  http.post('/site/api/auth/menu', () => {
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: menus });
  }),

  http.post('/site/api/menu/list', async ({ request }) => {
    const body = await request.json() as { pageIndex: number; pageSize: number; filters?: Partial<Menu> };
    const { pageIndex, pageSize, filters } = body;
    let list = [...menus];
    if (filters?.menuName) {
      list = list.filter(m => m.menuName.includes(filters.menuName!));
    }
    const total = list.length;
    // pageSize=0 means return all data
    if (pageSize === 0) {
      return HttpResponse.json({
        code: 200, msg: 'SUCCESS',
        data: { total, pageSize, pageIndex, list }
      });
    }
    const start = (pageIndex - 1) * pageSize;
    return HttpResponse.json({
      code: 200, msg: 'SUCCESS',
      data: { total, pageSize, pageIndex, list: list.slice(start, start + pageSize) }
    });
  }),

  http.get('/site/api/menu/:id', ({ params }) => {
    const item = menus.find(m => m.id === Number(params['id']));
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: item ?? null });
  }),

  http.post('/site/api/menu/create', async ({ request }) => {
    const body = await request.json() as Omit<Menu, 'id'>;
    const newItem: Menu = { ...body, id: nextId++ };
    menus.push(newItem);
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
  }),

  http.put('/site/api/menu/update', async ({ request }) => {
    const body = await request.json() as Menu;
    const idx = menus.findIndex(m => m.id === body.id);
    if (idx !== -1) menus[idx] = { ...menus[idx], ...body };
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
  }),

  http.post('/site/api/menu/del', async ({ request }) => {
    const { ids } = await request.json() as { ids: number[] };
    menus = menus.filter(m => !ids.includes(m.id));
    return HttpResponse.json({ code: 200, msg: 'SUCCESS', data: null });
  }),
];
