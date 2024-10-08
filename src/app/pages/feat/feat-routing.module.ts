import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'ex-modal', pathMatch: 'full' },
  { path: 'ex-modal', title: '拖拽modal', data: { key: 'ex-modal' }, loadComponent: () => import('./ex-modal/ex-modal.component').then(m => m.ExModalComponent) },
  { path: 'ex-drawer', title: '封装抽屉', data: { key: 'ex-drawer' }, loadComponent: () => import('./ex-drawer/ex-drawer.component').then(m => m.ExDrawerComponent) },
  { path: 'msg', title: '消息提示', data: { key: 'msg' }, loadComponent: () => import('./msg/msg.component').then(m => m.MsgComponent) },
  { path: 'frame', loadChildren: () => import('./frame/frame-routing') },
  { path: 'rich-text', title: '富文本', data: { key: 'rich-text' }, loadComponent: () => import('./rich-text/rich-text.component').then(m => m.RichTextComponent) },
  { path: 'upload', title: '文件上传', data: { key: 'upload' }, loadComponent: () => import('./upload/upload.component').then(m => m.UploadComponent) },
  {
    path: 'context-menu',
    title: '右键菜单',
    data: { key: 'context-menu' },
    loadComponent: () => import('./context-menu/context-menu.component').then(m => m.ContextMenuComponent)
  },
  {
    path: 'session-timeout',
    title: '登录超时',
    data: { key: 'session-timeout' },
    loadComponent: () => import('./session-timeout/session-timeout.component').then(m => m.SessionTimeoutComponent)
  },
  {
    path: 'click-out-side',
    title: 'clickOutSide',
    data: { key: 'click-out-side' },
    loadComponent: () => import('./click-out-side/click-out-side.component').then(m => m.ClickOutSideComponent)
  },
  { path: 'color-sel', title: '颜色选择器', data: { key: 'color-sel' }, loadComponent: () => import('./color-sel/color-sel.component').then(m => m.ColorSelComponent) },
  { path: 'scroll', loadChildren: () => import('./scroll/scroll-routing.module') },
  { path: 'img-preview', title: '图片预览', data: { key: 'img-preview' }, loadComponent: () => import('./img-preview/img-preview.component').then(m => m.ImgPreviewComponent) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs-routing') },
  { path: 'websocket', title: 'websocket测试', data: { key: 'websocket' }, loadComponent: () => import('./websocket/websocket.component').then(m => m.WebsocketComponent) },
  { path: 'full-screen', title: '全屏', data: { key: 'full-screen' }, loadComponent: () => import('./full-screen/full-screen.component').then(m => m.FullScreenComponent) },
  { path: 'icons', title: '图标', data: { key: 'icons' }, loadComponent: () => import('./icons/icons.component').then(m => m.IconsComponent) },
  { path: 'charts', loadChildren: () => import('./charts/charts-routing') },
  { path: 'ripple', title: '水波纹', data: { key: 'ripple' }, loadComponent: () => import('./ripple/ripple.component').then(m => m.RippleComponent) },
  { path: 'copy', title: '剪切板', data: { key: 'copy' }, loadComponent: () => import('./copy/copy.component').then(m => m.CopyComponent) },
  { path: 'setup', title: '引导页', data: { key: 'setup' }, loadComponent: () => import('./setup/setup.component').then(m => m.SetupComponent) },
  { path: 'download', title: '文件下载', data: { key: 'download' }, loadComponent: () => import('./download/download.component').then(m => m.DownloadComponent) },
  { path: 'qrcode', title: '二维码', data: { key: 'qrcode' }, loadComponent: () => import('./qrcode/qrcode.component').then(m => m.QrcodeComponent) },
  { path: 'water-mark', title: '水印', data: { key: 'water-mark' }, loadComponent: () => import('./water-mark/water-mark.component').then(m => m.WaterMarkComponent) },
  {
    path: 'feat1',
    title: '新功能1',
    data: { key: 'feat1' },
    loadComponent: () => import('../../pages/no-content/no-content.component').then(m => m.NoContentComponent)
  },
  {
    path: 'feat2',
    title: '新功能2',
    data: { key: 'feat2' },
    loadComponent: () => import('../../pages/no-content/no-content.component').then(m => m.NoContentComponent)
  },
  {
    path: 'feat3',
    title: '新功能3',
    data: { key: 'feat3' },
    loadComponent: () => import('../../pages/no-content/no-content.component').then(m => m.NoContentComponent)
  },
  {
    path: 'feat4',
    title: '新功能4',
    data: { key: 'feat4' },
    loadComponent: () => import('../../pages/no-content/no-content.component').then(m => m.NoContentComponent)
  },
  {
    path: 'feat5',
    title: '新功能5',
    data: { key: 'feat5' },
    loadComponent: () => import('../../pages/no-content/no-content.component').then(m => m.NoContentComponent)
  }
] satisfies Route[];
