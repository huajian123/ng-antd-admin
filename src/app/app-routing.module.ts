import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuicklinkStrategy} from 'ngx-quicklink';
import {HoverPreloadStrategy} from 'ngx-hover-preload';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  {path: 'default', loadChildren: () => import('./layout/default/default.module').then(m => m.DefaultModule)},
  {path: '', redirectTo: '/login/login-form', pathMatch: 'full'},
  {path: '**', redirectTo: '/login/login-form'}
];

// http://www.deathghost.cn/article/angular/88
@NgModule({
  // imports: [RouterModule.forRoot(routes, {preloadingStrategy: HoverPreloadStrategy})],
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy,
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabledBlocking'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
