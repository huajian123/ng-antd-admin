import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'ex-modal', pathMatch: 'full' },
  { path: 'ex-modal', data: { title: '拖拽modal', key: 'ex-modal' }, loadChildren: () => import('./ex-modal/ex-modal.component').then(m => m.ExModalComponent) },
  { path: 'ex-drawer', data: { title: '封装抽屉', key: 'ex-drawer' }, loadComponent: () => import('./ex-drawer/ex-drawer.component').then(m => m.ExDrawerComponent) },
  { path: 'msg', data: { title: '消息提示', key: 'msg' }, loadComponent: () => import('./msg/msg.component').then(m => m.MsgComponent) },
  { path: 'frame', loadChildren: () => import('./frame/frame-routing') },
  { path: 'rich-text', data: { title: '富文本', key: 'rich-text' }, loadComponent: () => import('./rich-text/rich-text.component').then(m => m.RichTextComponent) },
  { path: 'upload', data: { title: '文件上传', key: 'upload' }, loadComponent: () => import('./upload/upload.component').then(m => m.UploadComponent) },
  {
    path: 'context-menu',
    data: { title: '右键菜单', key: 'context-menu' },
    loadComponent: () => import('./context-menu/context-menu.component').then(m => m.ContextMenuComponent)
  },
  {
    path: 'session-timeout',
    data: { title: '登录过期', key: 'session-timeout' },
    loadComponent: () => import('./session-timeout/session-timeout.component').then(m => m.SessionTimeoutComponent)
  },
  {
    path: 'click-out-side',
    data: { title: 'clickOutSide', key: 'click-out-side' },
    loadComponent: () => import('./click-out-side/click-out-side.component').then(m => m.ClickOutSideComponent)
  },
  { path: 'color-sel', data: { title: '颜色选择器', key: 'color-sel' }, loadComponent: () => import('./color-sel/color-sel.component').then(m => m.ColorSelComponent) },
  { path: 'scroll', loadChildren: () => import('./scroll/scroll-routing.module') },
  { path: 'img-preview', data: { title: '图片预览', key: 'img-preview' }, loadComponent: () => import('./img-preview/img-preview.component').then(m => m.ImgPreviewComponent) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs-routing') },
  { path: 'websocket', data: { title: 'websocket测试', key: 'websocket' }, loadComponent: () => import('./websocket/websocket.component').then(m => m.WebsocketComponent) },
  { path: 'full-screen', data: { title: '全屏', key: 'full-screen' }, loadComponent: () => import('./full-screen/full-screen.component').then(m => m.FullScreenComponent) },
  { path: 'icons', data: { title: '图标', key: 'icons' }, loadComponent: () => import('./icons/icons.component').then(m => m.IconsComponent) },
  { path: 'charts', loadChildren: () => import('./charts/charts-routing') },
  { path: 'ripple', data: { title: '水波纹', key: 'ripple' }, loadComponent: () => import('./ripple/ripple.component').then(m => m.RippleComponent) },
  { path: 'copy', data: { title: '剪切板', key: 'copy' }, loadComponent: () => import('./copy/copy.component').then(m => m.CopyComponent) },
  { path: 'setup', data: { title: '引导页', key: 'setup' }, loadComponent: () => import('./setup/setup.component').then(m => m.SetupComponent) },
  { path: 'download', data: { title: '文件下载', key: 'download' }, loadComponent: () => import('./download/download.component').then(m => m.DownloadComponent) }
] as Route[];
