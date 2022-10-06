import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ex-modal', pathMatch: 'full' },
  { path: 'msg', loadChildren: () => import('./msg/msg.module').then(m => m.MsgModule) },
  { path: 'ex-modal', loadChildren: () => import('./ex-modal/ex-modal.module').then(m => m.ExModalModule) },
  { path: 'ex-drawer', loadChildren: () => import('./ex-drawer/ex-drawer.module').then(m => m.ExDrawerModule) },
  { path: 'msg', loadChildren: () => import('./msg/msg.module').then(m => m.MsgModule) },
  { path: 'frame', loadChildren: () => import('./frame/frame.module').then(m => m.FrameModule) },
  { path: 'rich-text', loadChildren: () => import('./rich-text/rich-text.module').then(m => m.RichTextModule) },
  { path: 'upload', loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule) },
  {
    path: 'context-menu',
    loadChildren: () => import('./context-menu/context-menu.module').then(m => m.ContextMenuModule)
  },
  {
    path: 'session-timeout',
    loadChildren: () => import('./session-timeout/session-timeout.module').then(m => m.SessionTimeoutModule)
  },
  {
    path: 'click-out-side',
    loadChildren: () => import('./click-out-side/click-out-side.module').then(m => m.ClickOutSideModule)
  },
  { path: 'color-sel', loadChildren: () => import('./color-sel/color-sel.module').then(m => m.ColorSelModule) },
  { path: 'scroll', loadChildren: () => import('./scroll/scroll.module').then(m => m.ScrollModule) },
  { path: 'img-preview', loadChildren: () => import('./img-preview/img-preview.module').then(m => m.ImgPreviewModule) },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsModule) },
  { path: 'websocket', loadChildren: () => import('./websocket/websocket.module').then(m => m.WebsocketModule) },
  { path: 'full-screen', loadChildren: () => import('./full-screen/full-screen.module').then(m => m.FullScreenModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
  { path: 'ripple', loadChildren: () => import('./ripple/ripple.module').then(m => m.RippleModule) },
  { path: 'copy', loadChildren: () => import('./copy/copy.module').then(m => m.CopyModule) },
  { path: 'setup', loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule) },
  { path: 'download', loadChildren: () => import('./download/download.module').then(m => m.DownloadModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatRoutingModule {}
