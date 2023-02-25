import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectivePreloadingStrategyService } from '@core/services/common/selective-preloading-strategy.service';

const routes: Routes = [
  { path: '', redirectTo: '/login/login-form', pathMatch: 'full' },
  { path: 'blank', loadChildren: () => import('./layout/blank/blank-routing') },
  { path: 'login', data: { preload: true }, loadChildren: () => import('./pages/login/login-routing') },
  { path: 'default', data: { preload: true }, loadChildren: () => import('./layout/default/default-routing') },
  { path: '**', redirectTo: '/login/login-form' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: SelectivePreloadingStrategyService,
      scrollPositionRestoration: 'top',
      // initialNavigation: 'enabledBlocking',
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
