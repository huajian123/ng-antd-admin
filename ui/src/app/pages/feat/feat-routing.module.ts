import { Route } from '@angular/router';

export default [
  { path: '', redirectTo: 'ex-modal', pathMatch: 'full' },
  { path: 'ex-modal', title: 'menu.default:feat:ex-modal', data: { key: 'ex-modal' }, loadComponent: () => import('./ex-modal/ex-modal.component').then(m => m.ExModalComponent) },
  { path: 'ex-drawer', title: 'menu.default:feat:ex-drawer', data: { key: 'ex-drawer' }, loadComponent: () => import('./ex-drawer/ex-drawer.component').then(m => m.ExDrawerComponent) },
  { path: 'msg', title: 'menu.default:feat:msg', data: { key: 'msg' }, loadComponent: () => import('./msg/msg.component').then(m => m.MsgComponent) },
  { path: 'frame', loadChildren: () => import('./frame/frame-routing') },
  { path: 'rich-text', title: 'menu.default:feat:rich-text', data: { key: 'rich-text' }, loadComponent: () => import('./rich-text/rich-text.component').then(m => m.RichTextComponent) },
  { path: 'upload', title: 'menu.default:feat:upload', data: { key: 'upload' }, loadComponent: () => import('./upload/upload.component').then(m => m.UploadComponent) },
  {
    path: 'context-menu',
    title: 'menu.default:feat:context-menu',
    data: { key: 'context-menu' },
    loadComponent: () => import('./context-menu/context-menu.component').then(m => m.ContextMenuComponent)
  },
  {
    path: 'session-timeout',
    title: 'menu.default:feat:session-timeout',
    data: { key: 'session-timeout' },
    loadComponent: () => import('./session-timeout/session-timeout.component').then(m => m.SessionTimeoutComponent)
  },
  {
    path: 'click-out-side',
    title: 'menu.default:feat:click-out-side',
    data: { key: 'click-out-side' },
    loadComponent: () => import('./click-out-side/click-out-side.component').then(m => m.ClickOutSideComponent)
  },
  { path: 'color-sel', title: 'menu.default:feat:color-sel', data: { key: 'color-sel' }, loadComponent: () => import('./color-sel/color-sel.component').then(m => m.ColorSelComponent) },
  { path: 'scroll', loadChildren: () => import('./scroll/scroll-routing.module') },
  { path: 'img-preview', title: 'menu.default:feat:img-preview', data: { key: 'img-preview' }, loadComponent: () => import('./img-preview/img-preview.component').then(m => m.ImgPreviewComponent) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs-routing') },
  { path: 'websocket', title: 'menu.default:feat:websocket', data: { key: 'websocket' }, loadComponent: () => import('./websocket/websocket.component').then(m => m.WebsocketComponent) },
  { path: 'full-screen', title: 'menu.default:feat:full-screen', data: { key: 'full-screen' }, loadComponent: () => import('./full-screen/full-screen.component').then(m => m.FullScreenComponent) },
  { path: 'icons', title: 'menu.default:feat:icons', data: { key: 'icons' }, loadComponent: () => import('./icons/icons.component').then(m => m.IconsComponent) },
  { path: 'charts', loadChildren: () => import('./charts/charts-routing') },
  { path: 'ripple', title: 'menu.default:feat:ripple', data: { key: 'ripple' }, loadComponent: () => import('./ripple/ripple.component').then(m => m.RippleComponent) },
  { path: 'copy', title: 'menu.default:feat:copy', data: { key: 'copy' }, loadComponent: () => import('./copy/copy.component').then(m => m.CopyComponent) },
  { path: 'setup', title: 'menu.default:feat:setup', data: { key: 'setup' }, loadComponent: () => import('./setup/setup.component').then(m => m.SetupComponent) },
  { path: 'download', title: 'menu.default:feat:download', data: { key: 'download' }, loadComponent: () => import('./download/download.component').then(m => m.DownloadComponent) },
  { path: 'qrcode', title: 'menu.default:feat:qrcode', data: { key: 'qrcode' }, loadComponent: () => import('./qrcode/qrcode.component').then(m => m.QrcodeComponent) },
  { path: 'water-mark', title: 'menu.default:feat:water-mark', data: { key: 'water-mark' }, loadComponent: () => import('./water-mark/water-mark.component').then(m => m.WaterMarkDemoComponent) },
  { path: 'keep-alive', title: 'menu.default:feat:keep-alive', data: { key: 'keep-alive' }, loadComponent: () => import('./keep-alive/keep-alive').then(m => m.KeepAliveDemo) },
  { path: 'transitions', loadChildren: () => import('./transitions/transitions-routing') },
  { path: 'signal-demo', loadChildren: () => import('./signal-demo/signal-demo-routing') },
  {
    path: 'multilingual',
    title: 'menu.default:feat:multilingual',
    data: { key: 'multilingual' },
    loadComponent: () => import('./multilingual/multilingual').then(m => m.Multilingual)
  }
] satisfies Route[];
